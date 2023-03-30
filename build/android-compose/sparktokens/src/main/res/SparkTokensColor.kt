
  package com.adevinta.sparktokenscolor
  import androidx.compose.ui.graphics.Color
  class Colors(
  val primary: Color,
  val onPrimary: Color,
  val primaryContainer: Color,
  val onPrimaryContainer: Color,
  val primaryVariant: Color,
  val onPrimaryVariant: Color,
  val secondary: Color,
  val onSecondary: Color,
  val secondaryContainer: Color,
  val onSecondaryContainer: Color,
  val secondaryVariant: Color,
  val onSecondaryVariant: Color,
  val success: Color,
  val onSuccess: Color,
  val successContainer: Color,
  val onSuccessContainer: Color,
  val alert: Color,
  val onAlert: Color,
  val alertContainer: Color,
  val onAlertContainer: Color,
  val error: Color,
  val onError: Color,
  val errorContainer: Color,
  val onErrorContainer: Color,
  val info: Color,
  val onInfo: Color,
  val infoContainer: Color,
  val onInfoContainer: Color,
  val neutral: Color,
  val onNeutral: Color,
  val neutralContainer: Color,
  val onNeutralContainer: Color,
  val background: Color,
  val onBackground: Color,
  val backgroundVariant: Color,
  val onBackgroundVariant: Color,
  val surface: Color,
  val onSurface: Color,
  val surfaceInverse: Color,
  val onSurfaceInverse: Color,
  val outline: Color,
  val outlineHigh: Color,
)

fun lightColors(
  primary: Color = Palette.coreTheblue500,
  onPrimary: Color = Palette.coreWhite,
  primaryContainer: Color = Palette.coreTheblue100,
  onPrimaryContainer: Color = Palette.coreTheblue700,
  primaryVariant: Color = Palette.coreTheblue700,
  onPrimaryVariant: Color = Palette.coreWhite,
  secondary: Color = Palette.coreSugarcotton500,
  onSecondary: Color = Palette.coreWhite,
  secondaryContainer: Color = Palette.coreSugarcotton100,
  onSecondaryContainer: Color = Palette.coreSugarcotton700,
  secondaryVariant: Color = Palette.coreSugarcotton700,
  onSecondaryVariant: Color = Palette.coreWhite,
  success: Color = Palette.coreApple500,
  onSuccess: Color = Palette.coreWhite,
  successContainer: Color = Palette.coreApple100,
  onSuccessContainer: Color = Palette.coreApple700,
  alert: Color = Palette.coreWiggins500,
  onAlert: Color = Palette.coreBlack,
  alertContainer: Color = Palette.coreWiggins100,
  onAlertContainer: Color = Palette.coreWiggins700,
  error: Color = Palette.coreChili500,
  onError: Color = Palette.coreWhite,
  errorContainer: Color = Palette.coreChili100,
  onErrorContainer: Color = Palette.coreChili700,
  info: Color = Palette.coreSky500,
  onInfo: Color = Palette.coreWhite,
  infoContainer: Color = Palette.coreSky100,
  onInfoContainer: Color = Palette.coreSky700,
  neutral: Color = Palette.coreSurfer500,
  onNeutral: Color = Palette.coreWhite,
  neutralContainer: Color = Palette.coreSurfer100,
  onNeutralContainer: Color = Palette.coreSurfer700,
  background: Color = Palette.coreWhite,
  onBackground: Color = Palette.coreBlack,
  backgroundVariant: Color = Palette.coreSurfer50,
  onBackgroundVariant: Color = Palette.coreBlack,
  surface: Color = Palette.coreWhite,
  onSurface: Color = Palette.coreBlack,
  surfaceInverse: Color = Palette.coreSurfer900,
  onSurfaceInverse: Color = Palette.coreWhite,
  outline: Color = Palette.coreSurfer200,
  outlineHigh: Color = Palette.coreBlack,
): Colors = Colors(
    primary,
    onPrimary,
    primaryContainer,
    onPrimaryContainer,
    primaryVariant,
    onPrimaryVariant,
    secondary,
    onSecondary,
    secondaryContainer,
    onSecondaryContainer,
    secondaryVariant,
    onSecondaryVariant,
    success,
    onSuccess,
    successContainer,
    onSuccessContainer,
    alert,
    onAlert,
    alertContainer,
    onAlertContainer,
    error,
    onError,
    errorContainer,
    onErrorContainer,
    info,
    onInfo,
    infoContainer,
    onInfoContainer,
    neutral,
    onNeutral,
    neutralContainer,
    onNeutralContainer,
    background,
    onBackground,
    backgroundVariant,
    onBackgroundVariant,
    surface,
    onSurface,
    surfaceInverse,
    onSurfaceInverse,
    outline,
    outlineHigh,
)

object Palette {
  val coreTheblue50: Color = Color(0xf4f4fcff)
  val coreTheblue100: Color = Color(0xe2e1f8ff)
  val coreTheblue200: Color = Color(0xb1aeecff)
  val coreTheblue300: Color = Color(0x8580e1ff)
  val coreTheblue400: Color = Color(0x5952d6ff)
  val coreTheblue500: Color = Color(0x2118c9ff)
  val coreTheblue600: Color = Color(0x191297ff)
  val coreTheblue700: Color = Color(0x140e79ff)
  val coreTheblue800: Color = Color(0x0d0a50ff)
  val coreTheblue900: Color = Color(0x080632ff)
  val coreTheblueV: Color = Color(0x7583ffff)
  val coreSugarcotton50: Color = Color(0xfff5f9ff)
  val coreSugarcotton100: Color = Color(0xffe1edff)
  val coreSugarcotton200: Color = Color(0xfebad6ff)
  val coreSugarcotton300: Color = Color(0xfe92bfff)
  val coreSugarcotton400: Color = Color(0xfe6ba7ff)
  val coreSugarcotton500: Color = Color(0xfd398aff)
  val coreSugarcotton600: Color = Color(0xca2e6eff)
  val coreSugarcotton700: Color = Color(0x982253ff)
  val coreSugarcotton800: Color = Color(0x651737ff)
  val coreSugarcotton900: Color = Color(0x3f0e22ff)
  val coreApple50: Color = Color(0xf5fbf8ff)
  val coreApple100: Color = Color(0xe0f2e9ff)
  val coreApple200: Color = Color(0xb7dfcbff)
  val coreApple300: Color = Color(0x8ecdaeff)
  val coreApple400: Color = Color(0x64bc90ff)
  val coreApple500: Color = Color(0x31a56bff)
  val coreApple600: Color = Color(0x278456ff)
  val coreApple700: Color = Color(0x1d6340ff)
  val coreApple800: Color = Color(0x14422bff)
  val coreApple900: Color = Color(0x0c291bff)
  val coreWiggins50: Color = Color(0xfffcf6ff)
  val coreWiggins100: Color = Color(0xfdf5e4ff)
  val coreWiggins200: Color = Color(0xfbe9bfff)
  val coreWiggins300: Color = Color(0xf9dc9aff)
  val coreWiggins400: Color = Color(0xf7cf76ff)
  val coreWiggins500: Color = Color(0xf4bf48ff)
  val coreWiggins600: Color = Color(0xc3993aff)
  val coreWiggins700: Color = Color(0x92732bff)
  val coreWiggins800: Color = Color(0x624c1dff)
  val coreWiggins900: Color = Color(0x3d3012ff)
  val coreChili50: Color = Color(0xfff7f6ff)
  val coreChili100: Color = Color(0xfee6e5ff)
  val coreChili200: Color = Color(0xfcc4c2ff)
  val coreChili300: Color = Color(0xfaa29fff)
  val coreChili400: Color = Color(0xf8807dff)
  val coreChili500: Color = Color(0xf65651ff)
  val coreChili600: Color = Color(0xc54541ff)
  val coreChili700: Color = Color(0x943431ff)
  val coreChili800: Color = Color(0x622220ff)
  val coreChili900: Color = Color(0x3e1514ff)
  val coreSky50: Color = Color(0xf3fafcff)
  val coreSky100: Color = Color(0xdaf1f4ff)
  val coreSky200: Color = Color(0xa8dee6ff)
  val coreSky300: Color = Color(0x77cbd8ff)
  val coreSky400: Color = Color(0x45b8caff)
  val coreSky500: Color = Color(0x07a0b8ff)
  val coreSky600: Color = Color(0x068093ff)
  val coreSky700: Color = Color(0x04606eff)
  val coreSky800: Color = Color(0x03404aff)
  val coreSky900: Color = Color(0x02282eff)
  val coreSurfer50: Color = Color(0xf8f8f9ff)
  val coreSurfer100: Color = Color(0xebebedff)
  val coreSurfer200: Color = Color(0xd1d0d5ff)
  val coreSurfer300: Color = Color(0xb6b5bcff)
  val coreSurfer400: Color = Color(0x9c9ba4ff)
  val coreSurfer500: Color = Color(0x7b7986ff)
  val coreSurfer600: Color = Color(0x5c5b64ff)
  val coreSurfer700: Color = Color(0x4a4950ff)
  val coreSurfer800: Color = Color(0x313036ff)
  val coreSurfer900: Color = Color(0x252428ff)
  val coreKiwi50: Color = Color(0xfdfdf6ff)
  val coreKiwi100: Color = Color(0xf8fae2ff)
  val coreKiwi200: Color = Color(0xf0f3bcff)
  val coreKiwi300: Color = Color(0xe7ec96ff)
  val coreKiwi400: Color = Color(0xdee570ff)
  val coreKiwi500: Color = Color(0xd3dd40ff)
  val coreKiwi600: Color = Color(0xa9b133ff)
  val coreKiwi700: Color = Color(0x7f8526ff)
  val coreKiwi800: Color = Color(0x54581aff)
  val coreKiwi900: Color = Color(0x353710ff)
  val coreBlack: Color = Color(0x000000ff)
  val coreWhite: Color = Color(0xffffffff)
  val coreSocialFacebook: Color = Color(0x4267b2ff)
  val coreSocialTwitter: Color = Color(0x1da1f2ff)
  val coreSocialWhatsapp: Color = Color(0x25d366ff)
  val coreSocialYoutube: Color = Color(0xff0000ff)
  val coreSocialInstagram: Color = Color(0xe1306cff)
  val coreSocialTiktok: Color = Color(0x000000ff)
  val coreSocialTelegram: Color = Color(0x0088ccff)
}