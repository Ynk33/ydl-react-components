import useFonts from "../useFonts";

export default function FontsTester() {
  const fonts = useFonts();

  return (
    <>
      <p className={fonts.primaryFont.className}>
        This is a text written with the primary font.
      </p>
      <p className={fonts.secondaryFont.className}>
        This is a text writter with the secondary font.
      </p>
    </>
  )
}