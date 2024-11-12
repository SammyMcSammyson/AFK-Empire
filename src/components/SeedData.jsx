import { db } from '@/utils/dbConnection';

let SeedData = () => {
  async function handleSubmission(formData) {
    'use server';
    console.log('Saving data to the Shop database...');

    const shopItem = formData.get('shopItem');
    const cost = formData.get('cost');
    const dps = formData.get('dps');
    const health = formData.get('health');
    const description = formData.get('description');
    const sell_value = formData.get('sell_value');
    const category = formData.get('category');

    await db.query(
      `INSERT INTO shop_table (item,cost, dps, health, description, sell_value, category) 
                VALUES ($1, $2,$3,$4,$5, $6,$7)    `,
      [shopItem, cost, dps, health, description, sell_value, category]
    );



    console.log('Insert Working');
  }

  async function handleSubmissionEnemy(formData) {
    'use server';
    console.log('Saving data to the Enemy Database');

    const enemy_name = formData.get('enemy_name');
    const enemy_health = formData.get('enemy_health');
    const dps = formData.get('dps');
    const characternumber = formData.get('characternumber');

    await db.query(
      `INSERT INTO enemy_info (enemy_name,enemy_health, dps, characternumber) 
                VALUES ($1, $2,$3,$4)    `,
      [enemy_name, enemy_health, dps, characternumber]
    );
  
    console.log('Insert Enemy Data Working');
  }

  return (
    <div>
      <h1> Insert Data into the Shop </h1>
      <form action={handleSubmission}>
        <label> Shop Item </label>
        <textarea id='shopItem' name='shopItem' type='text' required></textarea>
        <label> Cost </label>
        <textarea id='cost' name='cost' type='integer' required></textarea>

        <label> dps </label>

        <textarea id='dps' name='dps' type='integer' required></textarea>
        <label> Health </label>

        <textarea id='health' name='health' type='integer' required></textarea>
        <label> description </label>

        <textarea
          id='description'
          name='description'
          type='text'
          required
        ></textarea>
        <label> sell value </label>

        <textarea
          id='sell_value'
          name='sell_value'
          type='integer'
          required
        ></textarea>
        <label> category </label>

        <textarea id='category' name='category' type='text' required></textarea>

        <button type='submit'>Submit</button>
      </form>

      <h1> Insert Data into the Enemy </h1>
      <form action={handleSubmissionEnemy}>
        <label> Enemy Name </label>
        <textarea
          id='enemy_name'
          name='enemy_name'
          type='text'
          required
        ></textarea>
        <label> enemy_health </label>
        <textarea
          id='enemy_health'
          name='enemy_health'
          type='integer'
          required
        ></textarea>

        <label> dps </label>

        <textarea id='dps' name='dps' type='integer' required></textarea>
        <label> character number </label>

        <textarea
          id='characternumber'
          name='characternumber'
          type='integer'
          required
        ></textarea>

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default SeedData;
