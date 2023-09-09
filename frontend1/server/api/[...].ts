import axios from 'axios';
// import { getServerSession } from '#auth'
// import type { Session } from 'next-auth';

export default defineEventHandler(async (event) => {
    // let session: Session | null = null
    // try {
    //     session = await getServerSession(event)
    // } catch (error) {
    //     return sendRedirect(event, '/login', 401)
    // }

    return new Promise<any>(async (resolve, reject) => {
        // if(!session || !session.accessToken) {
            // reject({ statusMessage: 'Unauthorized', statusCode: 401 });
            // throw createError({ statusMessage: 'Unauthorized', statusCode: 401 })
        // }
        // console.log("------hihi------")
        const seperateSymbol = '.';
        // const seperateSymbol = '&';
        const key = event.context.params?.key ?? ''
        const platform = event.context.params?.platform ?? ''
        const otherLink = event.context.params?._ ?? ''

        // console.error("event.context???",event.context)
        // const accessToken = session?.accessToken;
        
        // const allowPlatform = ['report-api', 'cloudapi'];
        // if(!key || !platform || !allowPlatform.includes(platform) || !accessToken) {
        //     reject({ statusMessage: 'Unauthorized', statusCode: 401 });
        //     // throw createError({ statusMessage: 'Unauthorized', statusCode: 401 })
        // }

        // let tenantKey = '', organizationKey = '';
        // let xOrg = '';

        // if(key !== 'system') {
        //     [tenantKey, organizationKey] = key.split(seperateSymbol);
        //     xOrg = `${tenantKey}/${organizationKey}/`;
        // }

        // if(key === 'system' && platform == 'cloudapi') {
        //     // xOrg = 'MC0wLTA'
        // }

        let forwardData: any = {};

        const req = event.node.req;

        if(req.method == 'POST' || req.method == 'PUT') {

            forwardData = await readBody(event);
        } else {
            forwardData = getQuery(event);
        }

        // if(typeof forwardData === "object" && "_branch" in forwardData) {
        //     xOrg = xOrg + forwardData._branch;
        //     delete forwardData._branch;
        // }

        const frontEndRes = event.node.res;
        const url = process.env.SIMPLEAPP_BACKEND_URL +platform + '/' + otherLink;
        // console.warn('backend server-----',req.method,url,forwardData)
        const axiosConfig: any = {
            method: req.method,
            url: url,
            headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //         'X-Org': `${xOrg}`,
            },
            data: forwardData,
            params: forwardData,
        }
        
        // if(key === 'system') {
        //     axiosConfig.headers["X-Global"] = true;
        //     delete axiosConfig.headers["X-Org"];
        // }

        // if(otherLink.includes('avatar')) {
        //     axiosConfig.responseType = 'arraybuffer';
        //     // axiosConfig.headers['Acceptable'] = 'text/html,image/avif,image/webp,image/apng';
        // }

        axios(axiosConfig).then((res) => {
            if (res.headers['content-type'] === 'image/png') {
                // Set the response headers for the image
                frontEndRes.setHeader('Content-Type', 'image/png');
                frontEndRes.setHeader('Content-Disposition', 'inline');

                // Send the image data as the response body
                frontEndRes.end(Buffer.from(res.data, 'binary'));
            } else {
                // For non-image responses, set the Content-Type header and send the response body
                // setHeader(event, 'Content-type', <string>res.headers['Content-Type']);

                frontEndRes.statusCode = res.status;
                if(res.statusText) {
                    frontEndRes.statusMessage = res.statusText;
                }

                resolve(res.data);
            }

        }).catch((error) => {
            // console.log("==============================================================")
            // console.log('@@@@@@@@@@@@@ API error', error)
            // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
            // console.log('######### response', error.response)
            // console.log('#####################################')
            // console.log(axiosConfig);
            // console.log('#####################################')

            if (error.response?.status && error.response.status == '401') {
                return reject({ statusMessage: 'Unauthorized', statusCode: 401 });
                // throw createError({ statusMessage: 'Unauthorized', statusCode: 401 })
            }

            // reject(error.data)
            reject({ statusMessage: error.response.statusText, statusCode: error.response.status });
            // resolve({ status: 'ok' })
            // throw createError({ statusMessage: 'Bad Requests', statusCode: 404 })
        })

        // resolve({
        //     status: 'ok'
        // })
    })
    
})