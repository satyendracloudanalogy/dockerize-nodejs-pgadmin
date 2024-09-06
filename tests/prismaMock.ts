import { PrismaClient, User, Post } from "@prisma/client";

// Create a type for the mocked PrismaClient
const prismaMock = {
  user: {
    create: jest.fn() as jest.MockedFunction<
      (args: { data: User }) => Promise<User>
    >,
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn() as jest.MockedFunction<
      (args: { where: { id: number }; data: User }) => Promise<User>
    >,
    delete: jest.fn(),
  },
  post: {
    create: jest.fn() as jest.MockedFunction<
      (args: { data: Post }) => Promise<Post>
    >,
    findUnique: jest.fn(),
    findMany: jest.fn() as jest.MockedFunction<() => Promise<Post[]>>,
    update: jest.fn(),
    delete: jest.fn() as jest.MockedFunction<
      (args: { where: { id: number } }) => Promise<Post>
    >,
  },
};

prismaMock.user.create.mockResolvedValue({
  id: 1,
  name: "John Doe",
  email: "john@example.com",
});
prismaMock.post.create.mockResolvedValue({
  id: 1,
  title: "new posts",
  content: "this is user second post",
  userId: 1,
});
prismaMock.post.findMany.mockResolvedValue([
  { id: 1, title: "Post Title", content: "Post Content", userId: 1 },
]);

export default prismaMock;
