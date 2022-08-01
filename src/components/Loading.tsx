import { Center, Spinner } from 'native-base';

export function Loading() {
  return (
    <Center flex={1} bg="gray.700">
      <Spinner bg="red.700" />
    </Center> 
  );
}