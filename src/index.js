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

function formatConferences (conferences) {
    const conferencesInCorrectFormat = [];
    if (conferences === null || conferences === undefined) return conferencesInCorrectFormat;
    if (!Array.isArray(conferences)) return conferencesInCorrectFormat;

    return conferences.map(conference => {
        const { edition, name, startDate, endDate, location } = conference;

        if(name == null || startDate == null || location == null){
            throw new TypeError("Name, start date and location must be defined");
        }
        if(!Array.isArray(location) || location.length == 0){
            throw new TypeError("Location should be defined");
        }

        const editionFormat = edition ? `${edition} ` : "";
        let dateFormat = startDate;
        if (endDate != null) {
            dateFormat += ` / ${endDate}`;
        }
        const locationFormat = location.map(location => {
            if(location == null){
                throw new TypeError("Invalid location");
            }
            let locParts = [];
            if (location.city != null) locParts.push(location.city);
            if (location.state != null) locParts.push(location.state);
            if (location.country != null) locParts.push(location.country);
            return locParts.join(", ");
        }).join(" | ");

        return `${editionFormat}${name} · ${dateFormat} · ${locationFormat}`;
    })
}

console.log(formatConferences(input["input"]));

module.exports = formatConferences;