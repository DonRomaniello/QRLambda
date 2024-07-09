exports.handler = async (event) => {
    try {
        const id = Number(event.queryStringParameters.pi);   

        const response = {
            statusCode: 200,
            body: "The id is " + pi
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