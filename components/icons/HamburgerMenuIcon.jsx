export default function HamburgerMenuIcon({ color, width, height }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 30H5V26.6667H20V30ZM35 21.6667H5V18.3333H35V21.6667ZM35 13.3333H20V10H35V13.3333Z"
        fill={color || '#000'}
      />
    </svg>
  )
}
