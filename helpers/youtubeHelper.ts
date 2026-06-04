// https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=D7dLAzQrJXU&format=json


export const getYoutubeData = async (id: string) => {

    try {
        const resposne = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
        const data = await resposne.json()
        return {data, error: false}
    } catch (error) {
        console.log("error whilte getting data from youtube ", error)
        return {
            error : true,
            data : null

        }
    }

}