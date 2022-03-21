const http = require('http');
const Hero = require('./entities/hero');
const PORT = 3000;
const DEFAULT_HEADER = {'Content-Type':'application/json'};
const HeroesFactory = require('./factories/heroFactory');
const heroService = HeroesFactory.generateInstance();

const routes = {
    'heroes:get': async (request,response) => {
        const {id} = request.queryString
        const heroes = await heroService.find(id);
        response.write(JSON.stringify({results: heroes}))
        response.end()
    },
    'heroes:delete': async (request,response) => {
        const {id} = request.queryString;
        if(!id) {
            response.writeHead(400);
            response.write(JSON.stringify({error:
                'ID to delete not found'
            }))
            return response.end();
        }
        const deleted = await heroService.delete(id);
        response.write(JSON.stringify({success:deleted}));
        response.end();
    },
    'heroes:post': async (request,response) => {
        for await (const data of request) {
            try { 
                // await Promise.reject('/heroes:post')
                const item = JSON.parse(data);
                const hero = new Hero(item);
                const { error, valid} = hero.isValid();
                if(!valid) {
                    response.writeHead(400, DEFAULT_HEADER)
                    response.write(JSON.stringify({error:error.join(',')}))
                    return response.end()
                }
                const id = await heroService.create(hero)
                response.writeHead(201,DEFAULT_HEADER)
                response.write(JSON.stringify({success:'User created with success!',id:id}));

                return response.end();
            } catch (error){
                return handleError(response)(error)
            }
        }
    },
    default: (request,response) => {
        response.write('404');
        response.end();
    }
}

const handleError = response => {
    return error => {
        console.log("deu ruim! ",error);
        response.writeHead(500, DEFAULT_HEADER);
        response.write(JSON.stringify({error:'Internal Server Error'}));
        return response.end();
    }
}

const handler = (request,response) => {
    const { url, method } = request;
    const [first,route,id] = url.split('/')
    request.queryString = { id: isNaN(id) ? id : Number(id) };
    response.writeHead(200,DEFAULT_HEADER);
    const key = `${route}:${method.toLowerCase()}`
    const chosen = routes[key] || routes.default;
    return chosen(request,response)
        .catch(handleError(response))
}

http.createServer(handler)
    .listen(PORT, ()=> console.log('Server running at ',PORT))
