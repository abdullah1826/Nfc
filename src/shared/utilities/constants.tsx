import { appIcons, appImages } from "../theme/assets";

export const writeTagScreenCardData = [
    {
        key: 1,
        iconName: 'Text',
        icon: appImages.Text
    },
    {
        key: 2,
        iconName: 'URL',
        icon: appImages.Url
    },
    {
        key: 3,
        iconName: 'PhoneCall',
        icon: appImages.PhoneCall
    },
    {
        key: 4,
        iconName: 'Contact',
        icon: appImages.PhoneBook
    },
    {
        key: 5,
        iconName: 'Email',
        icon: appImages.Email
    },
    {
        key: 6,
        iconName: 'Location',
        icon: appImages.Map
    },
    {
        key: 7,
        iconName: 'QR Code',
        icon: appImages.QrScan
    },
    {
        key: 8,
        iconName: 'Socail Links',
        icon: appIcons.SocialLinks
    },
];







  export const getIconOfSocialLink = (iconName) => {
    switch (iconName) {
        case 'Instagram':
            return appImages.Instagram;
        case 'Facebook':
            return appImages.Facebook;
        case 'SnapChat':
            return appImages.SnapChat;
        case 'LinkedIn':
            return appImages.Linkedin;
        case 'Spotify':
            return appImages.Spotify;
        case 'Discored':
            return appImages.Discored;
        case 'Reddit':
            return appImages.Reddit;
        case 'Youtube':
            return appImages.Youtube;
        case 'Tiktok':
            return appImages.Tiktok;
        case 'Pinterest':
            return appImages.Pinterest;
        case 'Twitter':
            return appImages.Twitter;
        case 'Github':
            return appImages.Github;
            case 'Text':
                return appImages.Text;
                case 'URL':
                    return appImages.Url;
                    case 'PhoneCall':
                        return appImages.PhoneCall;
                        case 'Contact':
                            return appImages.PhoneBook;
                            case 'Email':
                                return appImages.Email;
                                case 'Location':
                                    return appImages.Map
                                    case 'QR Code':
                                        return appImages.QrScan
                                        case 'Socail Links':
                                            return appIcons.SocialLinks           
        default:
            return null; // or a default icon
    }
};



// export const settingScreenData = [
//     {
//         key: 1,
//         label: 'Rate this app',
//         icon: appIcons.Rate
//     },
//     {
//         key: 2,
//         label: 'Contact Us',
//         icon: appIcons.ContactUs
//     },
//     {
//         key: 3,
//         label: 'Privacy Policy',
//         icon: appIcons.PrivacyPolicy
//     },
//     {
//         key: 4,
//         label: 'Share this app',
//         icon: appIcons.Share
//     },
//     {
//         key: 5,
//         label: 'Help & Support',
//         icon: appIcons.Support
//     },
//     {
//         key: 6,
//         label: 'About',
//         icon: appIcons.About
//     },
//     {
//         key: 7,
//         label: 'Delete Account',
//         icon: appIcons.DeleteAccount
//     },
//     {
//         key: 8,
//         label: 'Logout',
//         icon: appIcons.Logout
//     },
// ];

export const SocialLinksScreenData = [
    {
        key: 1,
        iconName: 'Instagram',
        icon: appImages.Instagram,
    },
    {
        key: 2,
        iconName: 'Facebook',
        icon: appImages.Facebook,
    },
    {
        key: 3,
        iconName: 'SnapChat',
        icon: appImages.SnapChat,
    },
    {
        key: 4,
        iconName: 'LinkedIn',
        icon: appImages.Linkedin,
    },
    {
        key: 5,
        iconName: 'Spotify',
        icon: appImages.Spotify,
    },
    {
        key: 6,
        iconName: 'Discored',
        icon: appImages.Discored,
    },
    {
        key: 7,
        iconName: 'Reddit',
        icon: appImages.Reddit,
    },
    {
        key: 8,
        iconName: 'Youtube',
        icon: appImages.Youtube,
    },
    {
        key: 9,
        iconName: 'Tiktok',
        icon: appImages.Tiktok,
    },
    {
        key: 10,
        iconName: 'Pinterest',
        icon: appImages.Pinterest,
    },
    {
        key: 11,
        iconName: 'Twitter',
        icon: appImages.Twitter,
    },
    {
        key: 12,
        iconName: 'Github',
        icon: appImages.Github,
    },

];




