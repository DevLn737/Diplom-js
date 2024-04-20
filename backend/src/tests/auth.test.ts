// TODO: Если будет время, написать тесты
// import request from 'supertest';
// import app from '../app'; // Приложение Express

// describe('Registration Controller', () => {
//     it('should return 400 if required fields are missing', async () => {
//         const response = await request(app)
//             .post('/register')
//             .send({}); // Отправляем пустое тело запроса
//         expect(response.status).toBe(400);
//         expect(response.body).toHaveProperty('message', 'Пожалуйста, заполнить все поля регистрации');
//     });

//     it('should return 201 and created user if data is correct', async () => {
//         const response = await request(app)
//             .post('/register')
//             .send({ email: 'test@example.com', username: 'testuser', password: 'password123' });
//         expect(response.status).toBe(201);
//         expect(response.body).toHaveProperty('user');
//     });

//     it('should hash the password before saving the user', async () => {
//         const response = await request(app)
//             .post('/register')
//             .send({ email: 'test@example.com', username: 'testuser', password: 'password123' });
//         expect(response.status).toBe(201);
//         const createdUser = response.body.user;
//         // Здесь вы можете проверить, что поле passwordHash у созданного пользователя не равно исходному паролю
//     });

//     it('should return 400 if email is already registered', async () => {
//         // Предположим, что уже существует пользователь с email 'test@example.com'
//         const response = await request(app)
//             .post('/register')
//             .send({ email: 'test@example.com', username: 'testuser', password: 'password123' });
//         expect(response.status).toBe(400);
//         expect(response.body).toHaveProperty('errors');
//         // Здесь вы можете проверить, что возвращается ошибка, связанная с дублированием email
//     });

//     // Другие тестовые случаи
// });