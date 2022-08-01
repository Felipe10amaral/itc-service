import { Input as NatibeBaseInput, IInputProps } from 'native-base';

export function Input({ ...rest }: IInputProps) {
  return (
    <NatibeBaseInput
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      color="white"
      placeholderTextColor="gray.300"
      {...rest}
    >

    </NatibeBaseInput>
  );
}