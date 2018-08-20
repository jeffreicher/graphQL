const { graphql, buildSchema } = require('graphql');
const express = require('express');
const graphqlHTTP = require('express-graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const schema = buildSchema(`
type Query {
    video: Video,
    videos: [Video]
}

type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
}

type Schema {
    query: Query
}
`);

const videoA = {
    id: '2',
    title: 'basketball',
    duration: 120,
    watched: false
}

const videoB = {
    id: '3',
    title: 'football',
    duration: 150,
    watched: false
}

const videos = [videoA, videoB];

const resolvers = {
    video: () => ({
        id: '1',
        title: 'Foo',
        duration: 180,
        watched: true
    }),
    videos: () => videos

}

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

server.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});