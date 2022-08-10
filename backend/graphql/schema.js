const { buildSchema } = require("graphql/utilities");

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }
    
    type User {
        _id: ID!
        email: String!
        name: String!
        password: String
        posts: [Post!]!
        status: String
    }
    
    type AuthData {
        userId: ID!
        token: String!
    }
    
    type PostData {
        posts: [Post!]!
        totalPosts: Int!
    }
    
    input UserInputData {
        name: String!
        email: String!
        password: String!
    }
    
    input PostInputData {
        title: String!
        content: String!
        imageUrl: String!
        }
    
    type RootQuery {
        login(email: String!, password: String!): AuthData!
        posts(page: Int): PostData!
        post(postId: ID!): Post!
    }
    
    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput: PostInputData!): Post!
        updatePost(id: ID!, postInput: PostInputData!): Post!
        deletePost(id: ID!): Boolean!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);