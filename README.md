![Quiz English cover](https://quiz-english.app/quiz-english.png)

<div align="center"><strong>Quiz-English</strong></div>
<div align="center">Elevate Your English on the way to Fluency!.</div>
<br />
<div align="center">
<a href="https://quiz-english.com/">Website</a> 
<span> · </span>
<a href="https://github.com/henriqueweiand/quiz-english">GitHub</a> 
</div>

## Introduction

Quiz-English is your one-stop shop for trivia and quizzes that are smarter than your average brainteaser. Our AI curates questions from the real world, pulling from news , videos , blog posts ️, articles , podcasts , and more!

Whether you're a history buff , a science geek , or just love learning new stuff , Quiz-English has something to challenge your mind and keep you entertained! ✨

#### Ready to join the fun? Head over to Quiz-English now and see what awaits!

## Why

English learners, built this by English learners, for YOU! Quiz-English was born from the real struggles we faced learning English. We wanted a fun and engaging way to practice all your skills, especially reading and comprehension. That's why we created quizzes based on interesting topics you'll actually care about, like news, videos, and more!

## Local set up

Install one of the components from your command line.

#### Install dependencies

```sh
npm install
```

#### With npm

Copy .env.example to .env and fill the variables

```sh
DATABASE_URL="postgresql://docker:docker@localhost:5432/project?schema=public"
OPENAI_API_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

You will need to have keys for all these tools listed above, but, you can do it for free.

#### Running docker

I strong suggest to run docker locally. By executing the command you can use the exacly DATABASE_URL set before.

```sh
docker-compose up -d
```

and with the database up, you need to run the migrations

```sh
yarn prisma migrate dev
```

## Contributing

- [Contribution Guide](https://github.com/henriqueweiand/quiz-english/blob/main/CONTRIBUTING.md)

## Authors

- Henrique Weiand ([@hweiand](https://github.com/henriqueweiand))

## License

MIT License
