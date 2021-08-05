import pool from '../utils/pool.js';

class Sauce {
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
            VAlUES ($1, #2, $3)
            RETURNING *`,
            [name, price, heat]
        );
        return new Sauce(rows[0])
    }


}
