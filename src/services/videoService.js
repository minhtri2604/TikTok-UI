import * as request from "~/utils/request";

export const getVideos = async ({type="for-you" , page }) => {
    try{
        const res = await request.get('videos',{
            params:{

                type,
                page: page

            },
        });
        return res.data
    }catch (error ){
        console.log(error);
    };
}
