import * as fs from 'fs';
import * as express from 'express';
import { HomePage, CMS } from './cms';
import { configureGraphQLAPI } from './configureGraphQLAPI';
import { Domain, InMemoryCMS } from './cms/InMemoryCMS';

const app = express();

let filename = __dirname + '/../assets/cmsData.json';
fs.readFile(filename, function(err, data: Buffer) {
    let domain: Domain = JSON.parse(data.toString());
    if( !err ) {

        let cms = new InMemoryCMS(domain);
        // set up API
        configureGraphQLAPI(app, cms);

        // serve up the static build on the root 
        app.use(express.static(__dirname + '/../../client'));
        // redirect /faqs page to home page
        app.use('/faqs', express.static(__dirname + '/../../client'));

        app.listen(3000, function() {
            console.log('started server');
        });

    } else {
        console.error(`unable to start server, error reading file "${filename}"`, err);
    }
});

