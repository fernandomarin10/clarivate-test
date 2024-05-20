const formatConferences = require("../src/index");

const input = {
    "input": [
        {
            "edition": "4th",
            "name": "JBCN Conference",
            "startDate": "2018-06-11",
            "endDate": "2018-06-13",
            "location": [
                {
                    "city": "Barcelona",
                    "country": "Spain"
                }
            ]
        },
        {
            "edition": "3rd",
            "name": "DevTernity",
            "startDate": "2018-11-30",
            "endDate": "2018-12-01",
            "location": [
                {
                    "city": "Riga",
                    "country": "Latvia"
                }
            ]
        },
        {
            "edition": "1st",
            "name": "I T.A.K.E Unconference",
            "startDate": "2016-05-19",
            "endDate": "2016-05-20",
            "location": [
                {
                    "city": "Bucharest",
                    "country": "Romania"
                },
                {
                    "city": "Maramures",
                    "country": "Romania"
                }
            ]
        },
        {
            "edition": "2nd",
            "name": "Product Owner Rule Book",
            "startDate": "2016-04-11",
            "endDate": "2016-04-13",
            "location": [
                {
                    "city": "Paris",
                    "country": "France"
                },
                {
                    "city": "Madrid",
                    "country": "Spain"
                }
            ]
        },
        {
            "name": "Upfront Summit",
            "startDate": "2018-02-01",
            "location": [
                {
                    "city": "Los Angeles",
                    "state": "California",
                    "country": "United States"
                }
            ]
        },
        {
            "name": "IBM Think",
            "startDate": "2018-03-19",
            "location": [
                {
                    "state": "Nevada",
                    "country": "United States"
                }
            ]
        }
    ]
};

describe('Should validate input format', () => {
    test('Null input should return empty array', () => {
        const response = formatConferences(null);
        expect(response).toEqual([]);
    })
    test('Invalid format (string) input should return empty array', () => {
        const response = formatConferences("");
        const response2 = formatConferences("test");
        const response3 = formatConferences("     ");
        expect(response).toEqual([]);
        expect(response2).toEqual([]);
        expect(response3).toEqual([]);
    })
    test('Invalid format (object) input should return empty array', () => {
        const response = formatConferences({});
        const response2 = formatConferences({"test": "test"});
        expect(response).toEqual([]);
        expect(response2).toEqual([]);
    })
    test('Invalid format (empty) input should return empty array', () => {
        const response = formatConferences();
        expect(response).toEqual([]);
    })
    test('Invalid format (empty array) input should return empty array', () => {
        const response = formatConferences([]);
        expect(response).toEqual([]);
    })
})

describe('Happy Path from acceptance test', () => {
    test('Input from problem statement should be parsed as expected', () => {
        const response = formatConferences(input["input"]);
        expect(response).toEqual([
            '4th JBCN Conference · 2018-06-11 / 2018-06-13 · Barcelona, Spain',
            '3rd DevTernity · 2018-11-30 / 2018-12-01 · Riga, Latvia',
            '1st I T.A.K.E Unconference · 2016-05-19 / 2016-05-20 · Bucharest, Romania | Maramures, Romania',
            '2nd Product Owner Rule Book · 2016-04-11 / 2016-04-13 · Paris, France | Madrid, Spain',
            'Upfront Summit · 2018-02-01 · Los Angeles, California, United States',
            'IBM Think · 2018-03-19 · Nevada, United States'
          ]);
    })
    test('Input from problem statement should be parsed as expected, only 1 item', () => {
        const response = formatConferences([input.input[0]]);
        expect(response[0]).toBe('4th JBCN Conference · 2018-06-11 / 2018-06-13 · Barcelona, Spain');
    })
})

describe('Expect invalid objects inside the array', () => {
    test('Input wrong should throw erroe (null value in array)', () => {
        expect(() => formatConferences([null])).toThrow(Error);
    })
    test('Input wrong should throw erroe (empty object value in array)', () => {
        expect(() => formatConferences([{}])).toThrow(Error);
    })
    test('Input wrong should throw erroe (string in array)', () => {
        expect(() => formatConferences([""])).toThrow(Error);
    })
})

describe('Expect messing information in object input', () => {
    test('No end date value', () => {
        let inputObj = [{
            "edition": "4th",
            "name": "JBCN Conference",
            "startDate": "2018-06-11",
            "location": [
                {
                    "city": "Barcelona",
                    "country": "Spain"
                }
            ]
        }]
        const response = formatConferences(inputObj);
        expect(response[0]).toBe('4th JBCN Conference · 2018-06-11 · Barcelona, Spain');
    })

    test('No start date value', () => {
        let inputObj = [{
            "edition": "4th",
            "name": "JBCN Conference",
            "location": [
                {
                    "city": "Barcelona",
                    "country": "Spain"
                }
            ]
        }]
        expect(() => formatConferences(inputObj)).toThrow(Error);
    })
    test('No location value', () => {
        let inputObj = [{
            "edition": "4th",
            "name": "JBCN Conference",
            "startDate": "2018-06-11",
        }]
        expect(() => formatConferences(inputObj)).toThrow(Error);
    })
    test('No location value', () => {
        let inputObj = [{
            "edition": "4th",
            "name": "JBCN Conference",
            "startDate": "2018-06-11",
            "location": []
        }]
        expect(() => formatConferences(inputObj)).toThrow(Error);
    })
    test('Null location value', () => {
        let inputObj = [{
            "edition": "4th",
            "name": "JBCN Conference",
            "startDate": "2018-06-11",
            "location": [null, {}]
        }]
        expect(() => formatConferences(inputObj)).toThrow(Error);
    })

    // to check with product
    test('Empty object location value', () => {
        let inputObj = [{
            "edition": "4th",
            "name": "JBCN Conference",
            "startDate": "2018-06-11",
            "location": [{}]
        }]
        const response = formatConferences(inputObj);
        expect(response[0]).toBe('4th JBCN Conference · 2018-06-11 · ');
    })
    
})