import { pool } from '../config/db.js';

export const LoanModel = {
  async createLoan(book_id, member_id, due_date) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const bookCheck = await client.query(
        'SELECT available_copies FROM books WHERE id=$1',
        [book_id]
      );

      if (bookCheck.rows[0].available_copies <= 0) {
        throw new Error('Stok habis');
      }

      await client.query(
        'UPDATE books SET available_copies=available_copies-1 WHERE id=$1',
        [book_id]
      );

      const result = await client.query(
        `INSERT INTO loans (book_id,member_id,due_date)
         VALUES ($1,$2,$3) RETURNING *`,
        [book_id, member_id, due_date]
      );

      await client.query('COMMIT');
      return result.rows[0];

    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  async returnBook(id) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const loan = await client.query(
        `UPDATE loans SET status='RETURNED', return_date=NOW()
         WHERE id=$1 RETURNING *`,
        [id]
      );

      const book_id = loan.rows[0].book_id;

      await client.query(
        'UPDATE books SET available_copies=available_copies+1 WHERE id=$1',
        [book_id]
      );

      await client.query('COMMIT');
      return loan.rows[0];

    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },

  async getAllLoans() {
    const result = await pool.query('SELECT * FROM loans');
    return result.rows;
  }
};