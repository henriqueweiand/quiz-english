import { getTags } from '@/lib/get-tags'
import { DifficultyLevel, SourceTypes } from '@prisma/client'
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

    const tags = await getTags();
    const difficultyLevels: string[] = Object.values(DifficultyLevel);
    const sourceTypes: string[] = Object.values(SourceTypes);

    let sitemap = [] as Sitemap;

    if (tags) {
        for (let index = 0; index < tags.length; index++) {
            const tag = tags[index];
            sitemap.push({
                url: `${BASE_URL}?tags=${tag.name}`,
                lastModified: new Date(),
                changeFrequency: 'never',
                priority: 0.9,
            })
        }
    }

    if (difficultyLevels) {
        for (let index = 0; index < difficultyLevels.length; index++) {
            const difficultyLevel = difficultyLevels[index];

            sitemap.push({
                url: `${BASE_URL}?levels=${difficultyLevel}`,
                lastModified: new Date(),
                changeFrequency: 'never',
                priority: 0.8,
            })
        }
    }

    if (sourceTypes) {
        for (let index = 0; index < sourceTypes.length; index++) {
            const sourceType = sourceTypes[index];

            sitemap.push({
                url: `${BASE_URL}?sources=${sourceType}`,
                lastModified: new Date(),
                changeFrequency: 'never',
                priority: 0.8,
            })
        }
    }

    sitemap.push({
        url: `https://forms.gle/rj7kUYrX5Y7Hxn1b9`,
        lastModified: new Date(),
        changeFrequency: 'never',
        priority: 0.7,
    })

    return sitemap;
}