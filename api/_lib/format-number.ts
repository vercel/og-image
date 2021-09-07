import Decimal from 'decimal.js-light';
import isNil from 'lodash/isNil';
Decimal.set({ precision: 80, toExpPos: 1000 });

// https://stackoverflow.com/questions/11665884/how-can-i-parse-a-string-with-a-comma-thousand-separator-to-a-number#answer-45309230
// Consumers should use navigator?.language to determine locale when appropriate.
// We don't default it here to navigate.language right now because most of the crypto conversions are in US-based currency (. as decimal)
export function parseUnsanitizedNumber(
  value: string,
  locale: string = 'en-US',
) {
  const example = Intl.NumberFormat(locale).format(1.1);
  const cleanPattern = new RegExp(`[^-+0-9${example.charAt(1)}]`, 'g');
  const cleaned = value.replace(cleanPattern, '');
  const normalized = cleaned.replace(example.charAt(1), '.');
  return normalized;
}

export const createDecimalSafeNoThrow = (
  numberish: NumStrDecimal | undefined,
): Decimal | undefined => {
  if (isNil(numberish)) {
    return undefined;
  }
  try {
    return new Decimal(numberish);
  } catch (e) {
    return undefined;
  }
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  Produces a formatted number object used for display and calculations
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

The main function is `formatNumber`, however there are top-level functions that wrap for common cases like `formatEther`, `formatShares`, etc.

A formatted number generally has three parts: the sign (+ or -), the stylized number, and a denomination (Eth, Rep, %, etc.)

The formatted number object that is returned looks something like this:
  {
    value: the parsed number in numerical form, 0 if a bad input was passed in, can be used in calculations

    formattedValue: the value in numerical form, possibly rounded, can be used in calculations
    formatted: the value in string form with possibly additional formatting, like comma separator, used for display

    o.roundedValue: the value in numerical form, with extra rounding, can be used in calculations
    o.rounded: the value in string form, with extra rounding
    o.roundedFormatted: the value in string form, with formatting, like comma separator, used for display

    o.minimized: the value in string form, with trailing 0 decimals omitted, for example if the `formatted` value is 1.00, this minimized value would be 1
  }

The reason the number object has multiple states of rounding simultaneously,
is because the ui can use it for multiple purposes. For example, when showing ether,
we generally like to show it with 2 decimals, however when used in totals,
maximum precision is not necessary, and we can opt to show the `rounded` display, which is only 1 decimal.
Similar logic applies for `minimized`, sometimes we don't need to be consistent with the decimals
and just show the prettiest, smallest representation of the value.

The options object that is passed into `formatNumber` that enables all of this looks like:
  {
    decimals: the number of decimals for the precise case, can be 0-infinity
    decimalsRounded: the number of decimals for the prettier case, can be 0-infinity
    denomination: the string denomination of the number (ex. Eth, Rep, %), can be blank
    positiveSign: boolean whether to include a plus sign at the beginning of positive numbers
    zeroStyled: boolean, if true, when the value is 0, it formates it as a dash (-) instead
  }

TIP
Sometimes (not always) it is a good idea to use the formatted values in calculations,
rather than the original input number, so that values match up in the ui. For example, if you are
adding the numbers 1.11 and 1.44, but displaying them as 1.1 and 1.4, it may look awkward
if 1.1 + 1.4 = 2.6. If perfect precision isn't necessary, consider adding them using the formatted values.

*/
export type NumStrDecimal = number | Decimal | string;

export const createDecimal = (value: NumStrDecimal): Decimal => {
  let newBigNumber;
  try {
    let useValue = value;
    if (typeof value === 'object' && Object.keys(value).indexOf('_hex') > -1) {
      useValue = (value as any)._hex;
    }
    newBigNumber = new Decimal(`${useValue}`);
  } catch (e) {
    console.error('Error instantiating WrappedDecimal', e);
    throw e;
  }

  return newBigNumber;
};

export const ZERO = createDecimal(0);
export const ONE = createDecimal(1);
export const TWO = createDecimal(2);
export const TEN = createDecimal(10);

export interface FormattedNumber {
  fullPrecision: number | string;
  roundedValue: number | Decimal;
  roundedFormatted: string;
  formatted: string;
  formattedValue: number | string;
  denomination: string;
  minimized: string;
  value: number;
  rounded: number | string;
  full: number | string;
}

export interface FormattedNumberOptions {
  decimals?: number;
  decimalsRounded?: number;
  denomination?: (num: NumStrDecimal) => string;
  roundUp?: boolean;
  roundDown?: boolean;
  positiveSign?: boolean;
  zeroStyled?: boolean;
  minimized?: boolean;
  blankZero?: boolean;
  bigUnitPostfix?: boolean;
  removeComma?: boolean;
}

export const ETHER_NUMBER_OF_DECIMALS = 4;

const SMALLEST_NUMBER_DECIMAL_PLACES = 8;
const USUAL_NUMBER_DECIMAL_PLACES = 4;

export function formatEther(
  num: NumStrDecimal,
  opts: FormattedNumberOptions = {},
): FormattedNumber {
  return formatNumber(num, {
    decimals: ETHER_NUMBER_OF_DECIMALS,
    decimalsRounded: ETHER_NUMBER_OF_DECIMALS,
    denomination: (v) => `${v} ETH`,
    positiveSign: false,
    zeroStyled: false,
    blankZero: false,
    bigUnitPostfix: false,
    ...opts,
  });
}

export function formatErc20Default(
  num: NumStrDecimal,
  opts: FormattedNumberOptions = {},
): FormattedNumber {
  return formatNumber(num, {
    decimals: 6,
    decimalsRounded: 6,
    denomination: (v) => `${v}`,
    positiveSign: false,
    zeroStyled: false,
    blankZero: false,
    bigUnitPostfix: false,
    ...opts,
  });
}

/**
 * Fully formats a token price. Either either dollar formatted (e.g., $1234.5678) or token symbol formatted (e.g., 1234.5678 TOKEN_SYMBOL)
 * @param value value to format
 * @param isDollarDenominated should format with '$' and round like dollars ?
 * @param quoteTokenSymbol if not dollar formatted, add the symbol afterwards
 */
export const formatLabelPriceAsString = (
  value: NumStrDecimal | undefined,
  isDollarDenominated: boolean | undefined,
  quoteTokenSymbol: string | undefined,
): string | undefined => {
  if (!value) {
    return;
  }
  let s = '';
  if (isDollarDenominated) {
    s += '$';
  }
  if (value) {
    const decimalValueAsString = formatTokenAutomaticSafe(value, {
      isQuotedInDollars: !!isDollarDenominated,
    })?.formatted;
    s += decimalValueAsString;
  }
  if (!isDollarDenominated && quoteTokenSymbol) {
    s += ` ${quoteTokenSymbol}`;
  }
  return s;
};

export interface TokenFormatMetadataOptions {
  isQuotedInDollars?: boolean;
}
export function formatTokenAutomatic(
  num: NumStrDecimal,
  opts: FormattedNumberOptions & TokenFormatMetadataOptions = {},
) {
  // Sometimes num is null/undefined, coerce to 0 to prevent decimal error
  const numDecimal = new Decimal(num || 0);
  let numberOfDecimals = 6; // Default ERC20 token formatted with 6 digits
  if (opts.isQuotedInDollars) {
    numberOfDecimals = 2;
    // If number is smaller than 0.01, let's give it two extra decimals (e.g. DONUT USD price is $0.005)
    if (numDecimal.lt(0.01)) {
      numberOfDecimals = 4;
    }
  } else if (numDecimal.absoluteValue().greaterThanOrEqualTo(100)) {
    // Implies it had three digits to the left of the decimal
    numberOfDecimals = 4;
  } else if (numDecimal.absoluteValue().lte(0.0001)) {
    // Implies it has 4 leading zeroes as in the decimal position, we should use 8 digits
    numberOfDecimals = 8;
  }
  return formatErc20Default(numDecimal, {
    decimals: numberOfDecimals,
    decimalsRounded: numberOfDecimals,
    ...opts,
  });
}

export function formatTokenAutomaticSafe(
  num: NumStrDecimal | undefined,
  opts: FormattedNumberOptions & TokenFormatMetadataOptions = {},
) {
  if (!num) {
    return undefined;
  }
  return formatTokenAutomatic(num, opts);
}

export function addCommas(
  num: number | string,
  removeComma: boolean = false,
): string {
  let sides: Array<string> = [];

  sides = num.toString().split('.');
  sides[0] = removeComma
    ? sides[0]
    : sides[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return sides.join('.');
}

export function formatPercent(
  num: NumStrDecimal,
  opts: FormattedNumberOptions = {},
): FormattedNumber {
  return formatNumber(num, {
    decimals: 2,
    decimalsRounded: 0,
    denomination: (v) => `${v}%`,
    positiveSign: false,
    zeroStyled: false,
    blankZero: false,
    bigUnitPostfix: false,
    ...opts,
  });
}

export function formatUsd(
  num: NumStrDecimal,
  opts: FormattedNumberOptions = {},
): FormattedNumber {
  let decimals = 2;
  if (new Decimal(num).lessThan(0.01)) {
    decimals = 4;
  }
  return formatNumber(num, {
    decimals: decimals,
    decimalsRounded: 0,
    denomination: (v) => `$${v} USD`,
    removeComma: false,
    positiveSign: false,
    zeroStyled: false,
    blankZero: false,
    bigUnitPostfix: false,
    ...opts,
  });
}

export function formatDai(
  num: NumStrDecimal,
  opts: FormattedNumberOptions = {},
): FormattedNumber {
  return formatNumber(num, {
    decimals: 2,
    decimalsRounded: 2,
    denomination: (v) => {
      const isNegative = Number(v) < 0;
      const val = isNegative ? createDecimal(v).abs().toFixed(2) : v;
      return `${isNegative ? '-' : ''}$${val}`;
    },
    positiveSign: false,
    zeroStyled: false,
    blankZero: false,
    bigUnitPostfix: false,
    ...opts,
  });
}

export function formatNone(): FormattedNumber {
  return {
    value: 0,
    formattedValue: 0,
    formatted: '-',
    roundedValue: 0,
    rounded: '-',
    roundedFormatted: '-',
    minimized: '-',
    denomination: '',
    full: '-',
    fullPrecision: '0',
  };
}

export function formatBlank(): FormattedNumber {
  return {
    value: 0,
    formattedValue: 0,
    formatted: '',
    roundedValue: 0,
    rounded: '',
    roundedFormatted: '',
    minimized: '',
    denomination: '',
    full: '',
    fullPrecision: '0',
  };
}

export function optionsBlank(): FormattedNumberOptions {
  return {
    decimals: 0,
    decimalsRounded: 0,
    denomination: (_v) => '',
    roundUp: false,
    roundDown: false,
    positiveSign: false,
    zeroStyled: true,
    minimized: false,
    blankZero: false,
    bigUnitPostfix: false,
  };
}

export function formatGasCost(
  num: NumStrDecimal,
  opts: FormattedNumberOptions,
): FormattedNumber {
  return formatNumber(num, {
    decimals: 0,
    decimalsRounded: 0,
    denomination: (v) => `${v} GWEI`,
    positiveSign: false,
    zeroStyled: false,
    blankZero: false,
    bigUnitPostfix: false,
    ...opts,
  });
}

export function formatNumber(
  num: NumStrDecimal,
  opts: FormattedNumberOptions = optionsBlank(),
): FormattedNumber {
  const value = num != null ? createDecimal(num) : ZERO;
  const { minimized, bigUnitPostfix } = opts;
  const o: FormattedNumber = formatBlank();
  let {
    decimals,
    decimalsRounded,
    denomination,
    roundUp,
    roundDown,
    positiveSign,
    zeroStyled,
    blankZero,
    removeComma = false,
  } = opts;

  decimals = decimals || 0;
  decimalsRounded = decimalsRounded || 0;
  denomination = denomination || ((_v) => '');
  positiveSign = !!positiveSign;
  roundUp = !!roundUp;
  roundDown = !!roundDown;
  zeroStyled = zeroStyled !== false;
  blankZero = blankZero !== false;

  if (value.eq(ZERO)) {
    if (zeroStyled) return formatNone();
    if (blankZero) return formatBlank();
  }

  const decimalsValue = TEN.toPower(decimals);
  const decimalsRoundedValue = TEN.toPower(decimalsRounded);

  let roundingMode: number;
  if (roundDown) {
    roundingMode = Decimal.ROUND_DOWN;
  } else if (roundUp) {
    roundingMode = Decimal.ROUND_UP;
  } else {
    roundingMode = Decimal.ROUND_HALF_EVEN;
  }
  let formatSigFig = false;
  if (typeof num === 'string' && isNaN(parseFloat(num))) {
    o.value = 0;
    o.formattedValue = 0;
    o.formatted = '0';
    o.roundedValue = 0;
    o.rounded = '0';
    o.roundedFormatted = '0';
    o.minimized = '0';
    o.fullPrecision = '0';
  } else {
    const useSignificantFiguresThreshold = TEN.toPower(
      new Decimal(decimals).minus(1).negated().toNumber(),
    );
    const roundToZeroThreshold = ZERO;
    o.value = value.toNumber();
    if (value.abs().lt(roundToZeroThreshold)) {
      // value is less than zero
      o.formattedValue = '0';
    } else if (value.abs().lt(useSignificantFiguresThreshold)) {
      if (!decimals) {
        o.formattedValue = '0';
      } else {
        formatSigFig = true;
        o.formattedValue = value.toPrecision(decimals, roundingMode as any);
      }
    } else {
      o.formattedValue = value
        .times(decimalsValue)
        .toInteger()
        .dividedBy(decimalsValue)
        .toFixed(decimals);
    }

    const zeroFixed = ZERO.toFixed(USUAL_NUMBER_DECIMAL_PLACES);

    if (bigUnitPostfix && !formatSigFig) {
      o.formatted = addBigUnitPostfix(value, o.formattedValue, removeComma);
    } else if (formatSigFig) {
      // for numbers smaller than the set number of decimals - ie ones with scientific notation
      let formatted = value.toFixed(decimals || USUAL_NUMBER_DECIMAL_PLACES);

      if (formatted === zeroFixed || formatted === '-' + zeroFixed) {
        // if this is equal to zero, try to show significant digits up to 8 digit places
        formatted = value.toFixed(SMALLEST_NUMBER_DECIMAL_PLACES);
        if (
          formatted === ZERO.toFixed(SMALLEST_NUMBER_DECIMAL_PLACES) ||
          formatted === '-' + ZERO.toFixed(SMALLEST_NUMBER_DECIMAL_PLACES)
        ) {
          formatted = zeroFixed; // if there are no significant digits in the 8 decimal places, just use zero
        } else {
          formatted = value.toFixed(
            1 - Math.floor(Math.log(value.abs().toNumber()) / Math.log(10)),
          ); // find first two significant digit
        }
      }
      o.formatted = formatted;
    } else {
      o.formatted = addCommas(o.formattedValue, removeComma);
    }
    o.fullPrecision = value.toFixed();
    o.roundedValue = value
      .times(decimalsRoundedValue)
      .toInteger()
      .dividedBy(decimalsRoundedValue);
    o.roundedFormatted = bigUnitPostfix
      ? addBigUnitPostfix(
          value,
          o.roundedValue.toFixed(decimalsRounded),
          removeComma,
        )
      : addCommas(o.roundedValue.toFixed(decimalsRounded), removeComma);
    o.minimized = addCommas(
      new Decimal(o.formattedValue).toFixed(),
      removeComma,
    );
    o.rounded = new Decimal(o.roundedValue).toFixed();
    o.formattedValue = new Decimal(o.formattedValue).toNumber();
    o.roundedValue = o.roundedValue;
  }

  if (positiveSign && !bigUnitPostfix) {
    if (o.formattedValue >= 0) {
      o.formatted = `+${o.formatted}`;
      o.minimized = `+${o.minimized}`;
    }
    if (o.roundedValue >= 0) {
      o.rounded = `+${o.rounded}`;
    }
  }

  if (minimized) {
    o.formatted = o.minimized;
  }

  o.denomination = denomination('');
  o.full = denomination(o.formatted);

  if (
    (typeof num === 'string' && isNaN(parseFloat(num))) ||
    o.formatted === '0'
  ) {
    o.formatted = ZERO.toFixed(decimalsRounded);
  }
  return o;
}

function addBigUnitPostfix(
  value: Decimal,
  formattedValue: string,
  removeComma = false,
) {
  let postfixed;
  if (value.gt(createDecimal('1000000000000'))) {
    postfixed = '> 1T';
  } else if (value.gte(createDecimal('1000000000'))) {
    postfixed =
      value.dividedBy(createDecimal('1000000000')).toDecimalPlaces(2) + 'B';
  } else if (value.gt(createDecimal('1000000'))) {
    postfixed =
      value.dividedBy(createDecimal('1000000')).toDecimalPlaces(2) + 'M';
  } else if (value.gt(createDecimal('1000'))) {
    postfixed = value.dividedBy(createDecimal('1000')).toDecimalPlaces(2) + 'K';
  } else {
    postfixed = addCommas(formattedValue, removeComma);
  }
  return postfixed;
}

export function cutOffDecimal(value: string, numDigits: number) {
  const decimals = (value + '').split('.');
  if (decimals[1] && decimals[1].length > numDigits) {
    return decimals[0] + '.' + decimals[1].substring(0, numDigits);
  }
  return value;
}
