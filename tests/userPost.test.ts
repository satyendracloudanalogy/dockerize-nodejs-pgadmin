import { PrismaClient, User, Post } from '@prisma/client';


const prismaMock = {
    user: {
        create: jest.fn() as jest.MockedFunction<(args: { data: User }) => Promise<User>>,
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn() as jest.MockedFunction<(args: { where: { id: number }; data: User }) => Promise<User>>,
        delete: jest.fn() as jest.MockedFunction<(args: { where: { id: number } }) => Promise<User>>,
    },
    post: {
        create: jest.fn() as jest.MockedFunction<(args: { data: Post }) => Promise<Post>>,
        findUnique: jest.fn(),
        findMany: jest.fn() as jest.MockedFunction<() => Promise<Post[]>>,
        update: jest.fn(),
        delete: jest.fn() as jest.MockedFunction<(args: { where: { id: number } }) => Promise<Post>>,
    },
};

// Mock the PrismaClient
jest.mock('@prisma/client', () => {
    return {
        PrismaClient: jest.fn(() => prismaMock), // Now you can access prismaMock
    };
});


describe('User and Post API Tests', () => {
    // Add your test cases here
    test('Create a new user', async () => {
        const newUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
        prismaMock.user.create.mockResolvedValue(newUser);
        const result = await prismaMock.user.create({ data: newUser });
        expect(result).toEqual(newUser);
        expect(prismaMock.user.create).toHaveBeenCalledWith({ data: newUser });
        expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
    });

    test('Create a new post', async () => {
        const newPost = { id: 1, title: "New Post", content: "This is the user's second post", userId: 1 };
        prismaMock.post.create.mockResolvedValue(newPost);

        const result = await prismaMock.post.create({ data: newPost });

        expect(result).toEqual(newPost);
        expect(prismaMock.post.create).toHaveBeenCalledWith({ data: newPost });
        expect(prismaMock.post.create).toHaveBeenCalledTimes(1);
    });

    test('Get all posts by userId', async () => {
        const posts = [{ id: 1, title: "Post Title", content: "Post Content", userId: 1 }];
        prismaMock.post.findMany.mockResolvedValue(posts);

        const result = await prismaMock.post.findMany();

        expect(result).toEqual(posts);
        expect(prismaMock.post.findMany).toHaveBeenCalledTimes(1);
    });

    test('Update a user', async () => {
        const updatedUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
        prismaMock.user.update.mockResolvedValue(updatedUser);

        const result = await prismaMock.user.update({ where: { id: 1 }, data: updatedUser });

        expect(result).toEqual(updatedUser);
        expect(prismaMock.user.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updatedUser });
        expect(prismaMock.user.update).toHaveBeenCalledTimes(1);
    });

});
