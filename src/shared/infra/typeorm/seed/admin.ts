import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuid();
  const password = await hash('admin', 8);

  const user = {
    id,
    password,
    name: 'Admin User',
    email: 'admin@admin.com',
    isAdmin: true,
    driver_license: 'admin-1234',
    created_at: 'now()',
  };

  await connection.query(
    `INSERT INTO USERS(id, name, email, driver_license, password, "isAdmin", created_at ) 
      VALUES ('${user.id}', '${user.name}', '${user.email}', '${user.driver_license}', '${user.password}', ${user.isAdmin}, '${user.created_at}')
    `
  );

  return {
    user,
    connection,
  };
}

create().then(({ user, connection }) => {
  console.log('admin', user);
  connection.close();
});
