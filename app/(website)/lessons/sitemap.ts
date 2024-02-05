import { getLessons } from '@/lib/get-lessons'
import { sanitizeURL } from '@/lib/utils'
import { MetadataRoute } from 'next'

type Sitemap = Array<{
    url: string
    lastModified?: string | Date
    changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
    priority?: number
}>

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const BASE_URL = 'https://quiz-english.com';

    const lessons = await getLessons();

    let sitemap = [] as Sitemap;

    if (lessons) {
        for (let index = 0; index < lessons.length; index++) {
            const lesson = lessons[index];
            const lessonURL = `${BASE_URL}/lesson/${lesson.id}/${sanitizeURL(lesson.title)}`;

            sitemap.push({
                url: lessonURL,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 1,
            })
        }
    }

    return sitemap;
}