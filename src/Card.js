const Card = ({ src, name, codeName }) => (
  <li>
    <img src={src} alt={codeName} placeholder={name} />
  </li>
);

export default Card;