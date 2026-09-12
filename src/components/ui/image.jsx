export function Image({ fittingType = 'fill', className = '', alt = '', ...props }) {
  const objectFit = fittingType === 'fill' ? 'object-cover' : 'object-contain';
  return <img {...props} alt={alt} className={`${className} ${objectFit}`} />;
}
