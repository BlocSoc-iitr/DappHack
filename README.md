<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/BlocSoc-iitr/DappHack">
    <img src="frontent/public/hackathon.jpeg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">DappHack</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/BlocSoc-iitr/DappHack"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://ethglobal.com/showcase/dapphack-4tjef">View Demo</a>
    ·
    <a href="https://github.com/BlocSoc-iitr/DappHack/issues">Report Bug</a>
    ·
    <a href="https://github.com/BlocSoc-iitr/DappHack/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#How is it Made?">How is it made></a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Product Name Screen Shot][product-screenshot]

DappHack is a Web3 Hackathon Portal. It is a platform for hosting hackathons and other events related to blockchain and web3. It is a platform for developers to showcase their skills and build amazing projects. It is a platform for the community to come together and build something amazing.
We recognized some issues with traditional platforms and went to resolve through on-chain solutions.

1. Chain limitation for sponsors and builders - In DappHack, both sponsors and builders could participate in hackathons with any chain. Builders can pay a Stake in any supported tokens, and sponsors can pay a prize in any supported token.
2. Payment hassles and delays - WIth the on-chain logic of hackathons, all the prize and stake payment handling is done automatically of all tokens at once without the need for much off-chain hassles.
3. Web3 hacks without on-chain proofs - Participating in web3 hackathons with no on-chain proofs doesn't seem apt. With DappHack, builders would get on-chain proofs of their projects as NFTs and hackathons, along with their participation, would be marked in the blockchain forever.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][next.js]][next-url]
- [![React][react.js]][react-url]
- [Axelar]
- [Filecoin]
- [Tableland]
- [Saturn]
- [Push-Protocol]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## How is it Made?

DappHack is made possible with help of many outstanding protocols. Like Axelar, tableland, saturn, filecoin, push, etc.

### Axelar

Axelar is core to our product. All our cross-chain functionalities come with the help of Axelar. We used various Axelar SDKs to write contracts along with their implementation on different chains and integrate them with UI. With the help of Axelar, we were able to provide multi-chain functionalities to our Dapp. We have written some good contracts which could be seen and intialized from here [Axelar Contracts](https://github.com/BlocSoc-iitr/DappHack/tree/master/axelar-cross-chain). We have used axelar's gmp sdk, js sdk, axelar-local-dev, etc to make our contracts testing easy.

With axelar we deployed parent hackathon contracts one chain and child contracts on other different chains which are connected with the help of axelar. This enables sponsor to sponsor the hackathon on any chain and participants to participate and provide stake on any supported chain by communicating state through axelar gateways.

Some of our successful transactions on axelar can be seen here -
[0x9299eac94952235Ae86b94122D2f7c77F7F6Ad30](https://testnet.axelarscan.io/address/0x9299eac94952235Ae86b94122D2f7c77F7F6Ad30?tab=general_message_passing)

While working on axelar we have some feedback -

1. SDKs and axelar-example repo was of great help and the dev skills on them are really very very good.
2. There's some issue with configuration of filecoin calibnet, we had to tweak some node modules to get them working.
3. The gas payment from axelarscan was not working even after connecting wallet.

### Tableland

We used Tableland as the decentralized database for our application. All the user data, hackathons data, and team and project metadata are stored in tables of Tableland and retrieved globally. This enables databases that are controlled by sponsors and builders only but are accessible globally, a great feature of Tableland. With the help of the new Tableland studio our experience with Tableland was smooth.

Our studio of Tableland can be seen here - [DappHack Studio](https://studio.tableland.xyz/lordstudio/dapphack)

### Filecoin and Saturn

All the data files of images, videos, etc are stored decentrally on filecoin with the help of FVM and retrieved with Saturn. Our NFT data is also stored on IPFS and used to mint NFTs for projects. Thus Filecoin serves as a decentralized data storage solution for DappHack. Deal client contract enabled us to integrate the data storage functionalities on-chain with our contracts.
Saturn provided us smooth retrievals from ipfs gateways of NFT metadata, etc.

### Push Protocol

There are a lot of deadlines and updates throughout the hackathon, missing them could cost a lot. With the help of push protocol, we enable notifications for builders and sponsors as well, enabling a robust hackathon experience for users. With help of push protocol, we were able to send notifications to users on their devices and keep them updated with the latest happenings of the hackathon.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Shashank Trivedi - [@lordshashank](https://twitter.com/0xLord_forever)

Project Link: [https://github.com/BlocSoc-iitr/DappHack](https://github.com/BlocSoc-iitr/DappHack)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Thanks to all the sponsors and organizers for making this EthOnline possible.
Mentors have been helping us, giving reviews with various aspects of the project and we are grateful to them for that.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/BlocSoc-iitr/DappHack.svg?style=for-the-badge
[contributors-url]: https://github.com/BlocSoc-iitr/DappHack/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/BlocSoc-iitr/DappHack.svg?style=for-the-badge
[forks-url]: https://github.com/BlocSoc-iitr/DappHack/network/members
[stars-shield]: https://img.shields.io/github/stars/BlocSoc-iitr/DappHack.svg?style=for-the-badge
[stars-url]: https://github.com/BlocSoc-iitr/DappHack/stargazers
[issues-shield]: https://img.shields.io/github/issues/BlocSoc-iitr/DappHack.svg?style=for-the-badge
[issues-url]: https://github.com/BlocSoc-iitr/DappHack/issues
[license-shield]: https://img.shields.io/github/license/BlocSoc-iitr/DappHack.svg?style=for-the-badge
[license-url]: https://github.com/BlocSoc-iitr/DappHack/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: ./frontend/public/image.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
[Filecoin]: https://filecoin.io/
[Lighthouse]: https://www.lighthouse.storage/
[Tableland]: https://tableland.xyz/
[Push-Protocol]: https://push.org/
[Beryx]: https://www.brex.com/product/api
[Saturn]: https://saturn.tech/
[Axelar]: https://axelar.network/
