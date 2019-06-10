const Stats = module.exports;
const StatsDB = require('../models/stats');

const FootballStats = require('../controllers/footballstats');
const BasketballStats = require('../controllers/basketballstats');
const Event = require('../controllers/event');

Stats.addStatToEvent = async (data) => {

    // Obter dados
    // Obter tipo de desporto
    // De acordo com o desporto, criar nova stat

    const event = await Event.fetchOne({ oid: data.eventOid });

    if (!event)
        return 'Invalid event when adding stats!'

    const stats = data.stats;

    const dataType = {
        eventOid: 1,

        stats: {
            gameduration: stats.gameduration || 90,
            homeGoals: stats.homegoals || 0,
            awayGoals: stats.awaygoals || 0,
            homeRedCards: stats.homeredcards || 0,
            awayRedCards: stats.awayredcards || 0,
            homeYellowCards: stats.homeyellowcards || 0,
            awayYellowCards: stats.awayyellowcards || 0
        }
    }

    const sportName = event.sport.dataValues.name

    switch (sportName.toLowerCase()) {
        case 'football':
            try {
                const footballStats = await this.createFootballStats({
                    homegoals: data.stats.homegoals || 0,
                    awaygoals: data.stats.awaygoals || 0,
                    homeredcards: data.stats.homeredcards || 0,
                    awayredcards: data.stats.awayredcards || 0,
                    homeyellowcards: data.stats.homeyellowcards || 0,
                    awayyellowcards: data.stats.awayyellowcards || 0
                }, event.oid);


                return footballStats;
            } catch (e) {
                console.error(`Error creating football stats ${e}`)
            }

        case 'basketball':
            try {
                const basketballStats = await this.createBasketballStats({
                    homepoints: stats.homepoints || 0,
                    awaypoints: stats.awaypoints || 0,
                    hometriples: stats.hometriples || 0,
                    awaytriples: stats.awaytriples || 0,
                })
                return basketballStats;
            } catch (e) {
                console.error(`Error creating basketball stats ${e}`)
            }

        default:
            console.log("Sport not found!")
    }


}

Stats.fetchSubStatsType = async (eventOid) => {

    const currentStats = await this.fetchOne({ where: { eventOid } });

    if (!currentStats) {
        return;
    }

    const data = currentStats.dataValues;

    if (data.footballstatOid) {
        const footballStats = await FootballStats.fetchOne({ where: { oid: currentStats.oid } })
        return { ...footballStats.dataValues, sport: 'football' }
    } else if (data.basketballstatOid) {
        const basketballStats = await BasketballStats.fetchOne({ where: { oid: currentStats.oid } })
        return { ...basketballStats.dataValues, sport: 'basketball' }
    }

}

Stats.createFootballStats = async (stats, eventOid) => {

    const newFootballStats = {
        homegoals: stats.homegoals || 0,
        awaygoals: stats.awaygoals || 0,
        homeredcards: stats.homeredcards || 0,
        awayredcards: stats.awayredcards || 0,
        homeyellowcards: stats.homeyellowcards || 0,
        awayyellowcards: stats.awayyellowcards || 0
    }

    try {
        const createdFootballStats = await FootballStats.create(newFootballStats)

        if (createdFootballStats) {
            const genericStats = {
                gameduration: stats.gameduration || 9,
                footballstatOid: createdFootballStats.dataValues.oid,
                eventOid,
            }

            const createdStats = await this.create(genericStats);
        }
        return createdFootballStats.dataValues;
    } catch (e) {
        console.error(e);
    }
}

Stats.createBasketballStats = async (stats) => {

    const newFootballStats = {
        homepoints: 3 || 0,
        awaypoints: stats.awaypoints || 0,
        hometriples: stats.hometriples || 0,
        awaytriples: stats.awaytriples || 0,
    }

    try {
        const createdBasketballStats = await BasketballStats.create(newFootballStats)


        if (createdBasketballStats) {
            const genericStats = {
                gameduration: stats.gameduration || 9,
                basketballstatOid: createdBasketballStats.dataValues.oid
            }

            const createdStats = await this.create(genericStats);
        }
        return createdBasketballStats.dataValues;
    } catch (e) {
        console.error(e);
    }
}

// DB Abstraction

Stats.fetchOne = async (stats) => {
    try {
        return await StatsDB.findOne(stats);
    } catch (e) {
        console.error(e);
    }
}

Stats.fetch = async (stats) => {
    try {
        return await StatsDB.findAll(stats);
    } catch (e) {
        console.error(e);
    }
}


Stats.create = async (stats) => {
    try {
        return await StatsDB.create(stats);
    } catch (e) {
        console.error(e);
    }
}

Stats.deleteByName = async (name) => {
    try {
        return await StatsDB.destroy({ where: { name } });
    } catch (e) {
        console.error(e);
    }
}

Stats.delete = async (criteria) => {
    try {
        return await StatsDB.destroy(criteria);
    } catch (e) {
        console.error(e);
    }
}

Stats.update = async (findCriteria, changes) => {
    try {
        return await StatsDB.update(
            changes,
            findCriteria
        );
    } catch (e) {
        console.error(e);
    }
}
