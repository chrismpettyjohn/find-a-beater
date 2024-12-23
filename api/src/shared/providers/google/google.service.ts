import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GOOGLE_SEARCH_API_KEY, GOOGLE_SEARCH_ENGINE_ID } from '../../../app.const';

@Injectable()
export class GoogleService {

    async getCarImages(
        make: string,
        model: string,
        year: number,
    ): Promise<string[]> {
        const searchQuery = `${year} ${make} ${model} car`;
        console.log(GOOGLE_SEARCH_API_KEY)
        const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(
            searchQuery,
        )}&searchType=image&num=3`; // num=3 to get 3 results

        try {
            const response = await axios.get(url);
            const imageUrls = response.data.items.map((item) => item.link);
            return imageUrls;
        } catch (error) {
            console.log(error.response.data)
            return []; // Return an empty array on error
        }
    }
}