import { Button as NativeBaseButton, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
    title: string;
}
export function Button({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
        bg="primary.700"
        h={14}
        fontSize="sm"
        _pressed={{ bg: "secondary.700"}}
        {...rest}
    >
      <Heading 
        color="white"
        fontSize="md"
      > {title} </Heading>
    </NativeBaseButton>
  );
}