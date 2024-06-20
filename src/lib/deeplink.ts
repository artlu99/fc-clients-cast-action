export const supercast = (hash: string|`0x${string}`): string => {
    return hash ? `https://supercast.xyz/c/${hash}` : 'https://supercast.xyz'
}

export const neynar = (hash: string|`0x${string}`): string => {
    return hash ? `https://explorer.neynar.com/${hash}` : 'https://explorer.neynar.com'
}

export const nookDeprecated = (hash: string|`0x${string}`): string => {
    return hash ? `https://nook.social/casts/${hash}` : 'https://nook.social'
}

export const vasco = (hash: string|`0x${string}`): string => {
    return hash ?  `https://vasco.wtf/cast/${hash}` : 'https://vasco.wtf'
}

export const farquest = (hash: string|`0x${string}`, fid: number): string => {
    return (hash && fid) ?  `https://far.quest/${fid}/${hash}` : 'https://far.quest/cast'
}
