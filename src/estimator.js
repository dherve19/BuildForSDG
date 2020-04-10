/* 
    format of input data
    {
        region: {
            name: " Africa",
            avgAge: 19.7,
            avgDailyIncomeInUSD:5,
            avgDailyIncomePopulation: 0.71
        },
        periodType: "days",
        timeToElapse: 58,
        reportedCases: 674,
        totalHospitlBeds:1380614
    }

    output format:
    {
        data: {},
        impact:{},
        severeImpact: {}
    }
    {
        data: { what was inputed},
        impact:{
            currentlyInfected: 27470,
            infectionsByRequestedTime: 112517120,
            severeCasesByRequestedTime:16877568,
            hospitalBedsByRequestedTime: -16639962,
            casesForICUByRequestedTime: 5625856,
            casesForVentilatorsByRequestedTime: 2252342,
            dollarsInFlight: 12484899635.2
        },
        severeImpact: {
             currentlyInfected: 237350,
            infectionsByRequestedTime: 562585600,
            severeCasesByRequestedTime:84387840,
            hospitalBedsByRequestedTime: -84150234,
            casesForICUByRequestedTime: 28129280,
            casesForVentilatorsByRequestedTime: 11251712,
            dollarsInFlight: 62424498176
        }
    }
*/
const covid19ImpactEstimator = (data) =>{
    // data
    let date = {
        data: data,
        impact:{
            currentlyInfected: data.reportedCases  * 10,
            infectionsByRequestedTime: data.reportedCases  * 10 * 1024 ,
            severeCasesByRequestedTime:Math.ceil(data.reportedCases  * 10 * 1024 * 0.15),
            hospitalBedsByRequestedTime:(data.totalHospitlBeds * 0.35) - data.reportedCases  * 10 * 1024 * 0.15>0? Math.ceil((data.totalHospitlBeds * 0.35) - data.reportedCases  * 10 * 1024 * 0.15) : Math.floor((data.totalHospitlBeds * 0.35) - data.reportedCases  * 10 * 1024 * 0.15) ,
            casesForICUByRequestedTime:Math.ceil( data.reportedCases  * 10 * 1024 *0.05) ,
            casesForVentilatorsByRequestedTime: Math.ceil(data.reportedCases  * 10 * 1024 * 0.02) ,
            dollarsInFlight: (data.reportedCases  * 10 * 1024 * 0.65) * data.region.avgDailyIncomePopulation * 30
        },
        severeImpact: {
            currentlyInfected: data.reportedCases *50 ,
           infectionsByRequestedTime: data.reportedCases  * 50 * 1024,
           severeCasesByRequestedTime:Math.ceil( data.reportedCases  * 50 * 1024 * 0.15),
           hospitalBedsByRequestedTime:(data.totalHospitlBeds * 0.35) - data.reportedCases  * 10 * 1024 * 0.15>0? Math.ceil((data.totalHospitlBeds * 0.35) - data.reportedCases  * 50 * 1024 * 0.15) : Math.floor((data.totalHospitlBeds * 0.35) - data.reportedCases  * 50 * 1024 * 0.15) ,
           casesForICUByRequestedTime: Math.ceil(data.reportedCases  * 50 * 1024 * 0.05),
           casesForVentilatorsByRequestedTime: Math.ceil(data.reportedCases  * 50 * 1024 * 0.02),
           dollarsInFlight: (data.reportedCases  * 50 * 1024 * 0.65) * data.region.avgDailyIncomePopulation * 30
       }

    }
    return date;
};
/* console.log(covid19ImpactEstimator({
    region: {
        name: " Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD:5,
        avgDailyIncomePopulation: 0.71
    },
    periodType: "days",
    timeToElapse: 58,
    reportedCases: 674,
    totalHospitlBeds:1380614
}))
 */
export default covid19ImpactEstimator;
