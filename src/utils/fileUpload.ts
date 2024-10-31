import { createClient } from '@supabase/supabase-js';
const bucket = 'ems-bucket';

const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string
);

export default async function uploadImage(base64Image: string): Promise<string> {
    try {
        // Remove data URL prefix if present
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

        // Convert base64 to buffer
        const buffer = Buffer.from(base64Data, 'base64');

        // Generate unique filename
        const timestamp = Date.now();
        const filename = `prodImgs/${timestamp}-${Math.random().toString(36).substring(7)}.png`;

        // Upload to Supabase
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filename, buffer, {
                contentType: 'image/png',
                cacheControl: '3600'
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filename);

        return publicUrl;
    } catch (error) {
        console.error('Image upload error:', error);
        throw new Error('Failed to upload image');
    }
}