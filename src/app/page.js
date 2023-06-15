import React from 'react';
import * as cheerio from 'cheerio';

async function Homepage() {
    const matches = await getGameData()
    return (
        <div>
            <h1>Matches</h1>
            <br/>
            {matches.map((element, index) => (
                <div key={index}>
                    <p>{element.teamNames}</p>
                    <p>{element.matchStart}</p>
                    <br/>
                </div>
            ))}
        </div>
    );
}

async function getGameData() {
    const response = await fetch(
        "https://www.uol.com.br/esporte/futebol/central-de-jogos/",
        {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
            },
        }
    );
    const html = await response.text();

    const $ = cheerio.load(html);

    const date = "18/06";
    const scrapedMatches = [];

    $(`.match-wrapper[data-cfg*='${date}']`).each((index, element) => {
        const teamNames = $(element).find(".team-name").map((index, el) => $(el).text().trim()).get();
        const matchStart = $(element).find(".match-info-hora").text().trim();
        const joinedTeamNames = teamNames.join(" vs ").trim();
        console.log(joinedTeamNames);
        scrapedMatches.push({ teamNames: joinedTeamNames, matchStart });
    });

    return scrapedMatches
}

export default Homepage;