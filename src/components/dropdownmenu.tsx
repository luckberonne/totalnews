// 'use client';
// import { useEffect, useState } from 'react';
// import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from "@nextui-org/react";
// import { genres } from '@/services/accions/genres';

// interface Genre {
//   id: number;
//   name: string;
// }

// const DropdownComponent = () => {
//   const [genreList, setGenreList] = useState<Genre[]>([]);
//   useEffect(() => {
//     const fetchGenres = async () => {
//       const result = await genres();
//       setGenreList(result.genres);
//     };

//     fetchGenres();
//   }, []);

//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         <Button variant="light">Peliculas</Button>
//       </DropdownTrigger>
//       <DropdownMenu aria-label="Link Actions">
//         {genreList.map((genre) => (
//           <DropdownItem key={genre.id} href={`/filter/${genre.name}`}>
//             {genre.name}
//           </DropdownItem>
//         ))}
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

// export default DropdownComponent;