import axios from 'axios';


export async function pfp(name:string) {
    const inputs = {
        method: "GET",
        url: `https://community.infiniteflight.com/u/${name}.json`
    }

    const req = await axios.request(inputs);

  return (req.request.host+ req.data.users[0].avatar_template);
    
}
