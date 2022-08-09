export const faqData = [
    {
        title: 'What does the name mean?',
        content: '-----------'
    },
    {
        title: 'What is the projects mission?',
        content: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat aute irure dolor.'
    },
    {
        title: 'Who are the founders?',
        content: '-----------'
    }
];
export const faqData_1 = [
    {
        title: 'How can I meet an Bull Chick OG?',
        content: '-----------'
    },
    {
        title: 'What is the floor price?',
        content: '-----------'
    },
    {
        title: 'Will there be more collections?',
        content: '-----------'
    },
];
export const CHAIN_ID = 4;
export const DefaultNetwork = Number(CHAIN_ID);
export const RinkebyRPCURL = `https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`;
export const Bridge = "https://bridge.walletconnect.org";

export const networkInfo = [
    {
        name: 'Ethereum',
        label: 'Ethereum',
        icon: '/img/coin/ethereum.png',
        chainId: 1, //'0x1',
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
        rpcUrl: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
        explorer: ['https://etherscan.io'],
    },
    {
        name: 'Rinkeby Test Network',
        label: 'Rinkeby Test Network',
        icon: '/img/coin/ethereum.png',
        chainId: 4, //'0x4',
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
        rpcUrl: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
        explorer: ['https://rinkeby.etherscan.io'],
    },
];

// export const SIMPLE_NFT_CONTRACT_ADDRESS = '0x503FA406b6C31EC47823a58cB339163B4233851A';