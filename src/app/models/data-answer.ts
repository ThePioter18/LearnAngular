import { Answer } from './answer';

export const REPLY: Answer[] = [
    {
        idQuestion: 1,
        reply: 'Wykorzystujemy do tego własność "length". Przykład: nazwa_tablicy.length',
        authorQuestion: 'Paweł',
        authorAnswer: 'Ania',
        votes: 3
    },
    {
        idQuestion: 2,
        reply: 'Można użyć json-server, aby zrobić proste api lokalne.',
        authorQuestion: 'Paweł',
        authorAnswer: 'Marek',
        votes: 3
    },
    {
        idQuestion: 3,
        reply: 'Dobrze jest używać Postmana, aby podejrzeć sobie co dostajemy z api.',
        authorQuestion: 'Piotr',
        authorAnswer: 'Janek',
        votes: 0
    },
    {
        idQuestion: 3,
        reply: 'Zamiast Postmana jest też inna opcja. Użycie Advanced REST Client - jest nieco mniej rozbudowany.',
        authorQuestion: 'Piotr',
        authorAnswer: 'Kasia',
        votes: 2
    }
];
