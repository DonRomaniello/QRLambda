exports.handler = async (event) => {
    try {
        const id = Number(event.queryStringParameters.q);   

        const response = {
            statusCode: 200,
            body: "The id is " + id
        };

        return response; 
        }
    catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: "An error occurred"
        };
    }
    
};