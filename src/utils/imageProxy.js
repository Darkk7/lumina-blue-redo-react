/**
 * Utility function to generate a proxied image URL
 * This helps avoid CORS and 403 issues with S3 by routing through our Next.js API
 */

export const getProxiedImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  
  // If the URL is already a full URL, encode it
  if (imageUrl.startsWith('http')) {
    return `/api/proxy-image?url=${encodeURIComponent(imageUrl)}`;
  }
  
  // If it's a path, construct the full URL first
  const baseUrl = 'https://s3.eu-west-2.amazonaws.com/luminablue-blogs';
  const fullUrl = imageUrl.startsWith('/') 
    ? `${baseUrl}${imageUrl}`
    : `${baseUrl}/${imageUrl}`;
    
  return `/api/proxy-image?url=${encodeURIComponent(fullUrl)}`;
};
