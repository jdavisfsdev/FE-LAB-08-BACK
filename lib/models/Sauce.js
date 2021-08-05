import pool from '../utils/pool.js';

export default class Sauce {
    id;
    name;
    price;
    heat;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.price = row.price;
        this.heat = row.heat;
    }

    static async insert ({ name, price, heat }) {

        const { rows } = await pool.query(
            `INSERT INTO sauces (name, price, heat)
            VAlUES ($1, $2, $3)
            RETURNING *`,
            [name, price, heat]
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


}
