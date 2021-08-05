import pool from '../utils/pool.js';

export default class Sauce {
    id;
    name;
    price;
    heat;
    url;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.price = row.price;
        this.heat = row.heat;
        this.url = row.url;
    }

    static async insert ({ name, price, heat, url }) {

        const { rows } = await pool.query(
            `INSERT INTO sauces (name, price, heat, url)
            VAlUES ($1, $2, $3, $4)
            RETURNING *`,
            [name, price, heat, url]
        );
        return new Sauce(rows[0])
    }

    static async findById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM sauces
            WHERE id = $1`,
            [id]
        );
        return new Sauce(rows[0])
    }

    static async findAllItems() {
        const { rows } = await pool.query(
            `SELECT * FROM sauces`
        );
        return rows.map(sauce => new Sauce(sauce))
    }

    static async updateItem(id, {name, price, heat, url}) {
        const { rows } = await pool.query(
            `UPDATE sauces
            SET name = $1, price = $2, heat = $3, url = $4
            WHERE id = $5
            RETURNING *`,
            [name, price, heat, url, id]
        );
        return new Sauce(rows[0])
    }

    static async deleteItem(id) {
        const { rows } = await pool.query(
            `DELETE FROM sauces
            WHERE id = $1
            RETURNING *`,
            [id]
        );
        return new Sauce(rows[0])
    }


}
