# AI-Assisted Audit System for Solidity Smart Contracts Using OpenAI API

## Overview

This technical report outlines the development and capabilities of an AI-assisted audit system designed for Solidity smart contracts, leveraging the OpenAI API. The system aims to enhance the traditional audit process by introducing machine learning capabilities to detect vulnerabilities, suggest code optimizations, and ensure adherence to best coding practices. The ultimate goal is to reduce transaction costs and improve the security and efficiency of smart contracts on blockchain platforms.

## System Architecture

### AI Model Development

The core of the system is a custom-trained AI model developed using OpenAI's services. The model training involved curating a comprehensive dataset from various resources, including historical smart contract vulnerabilities, common attack vectors, and best practices for Solidity development. This dataset was used to fine-tune the model, equipping it with the knowledge to analyze and evaluate smart contracts effectively.

### Features

#### Code Review and Vulnerability Detection

The system can perform an in-depth review of Solidity smart contracts, identifying potential vulnerabilities such as reentrancy attacks which are very well known, integer overflows, and improper access controls. By leveraging the AI model's understanding of attack patterns and vulnerabilities, it provides a detailed report highlighting areas of concern.
Every time I see a new attack into the ecosystem, I will be able to train this model to make know (at least a bit) this type of attack in order to try to counter them.

#### Optimization Suggestions

In addition to security audits, the system offers optimization suggestions to improve the smart contract's gas efficiency. This feature is crucial for developers aiming to minimize the transaction fees associated with deploying and interacting with smart contracts on the Ethereum network.

#### Code Correction and Best Practices

The AI model is capable of suggesting corrections for poorly written code and advising on best practices for Solidity development. This not only enhances the security of smart contracts but also promotes code readability and maintainability.

### API Integration

An API has been developed to facilitate seamless interaction with the AI model. This API serves as the interface through which users can submit their smart contracts for review and receive audit reports. The API's design emphasizes ease of use and integration, making it accessible to developers with varying levels of expertise.

## Future Development: VSCode Extension and real-time auditing  

### VSCode Extension  
The next phase of the project involves developing a Visual Studio Code (VSCode) extension. This extension will integrate the AI-assisted audit system directly into the development environment, providing real-time feedback and suggestions as developers write and review their Solidity code. The extension aims to highlight issues that may be overlooked by the human eye, further enhancing the security and efficiency of smart contract development.

### Real-Time audit  
My end goal would be to make this project run in real time on deployed contract in order to analyze the flow of on-chain txs. If something abnormal happens the assistant would be able to see it and describe what happens with an human readable way.

## Failed attempts
It was one of my first api project so I tried multiple ways to do it. I also tried to create my own GPT with GPT store. I succeed but I was unable to use it with open api so I came back to assistant. 

## Conclusion

The AI-assisted audit system for Solidity smart contracts represents a significant advancement in the field of smart contract development and security.
I wanted to profit of this to build a useful and composable tool such as this little api based on my model in order to use it in various situations.
There are already some solutions online with this but they are expensive and there is no possibility of doing a solidity extension of it. For now, I didn't find any vscode extension available for doing this.
By leveraging the capabilities of the OpenAI API, this project provides a tool for developers seeking to enhance the security, efficiency, and reliability of their smart contracts. The upcoming VSCode extension will further streamline the audit process, embedding these advanced capabilities directly into the developers' workflow. It will also allow more efficient files audits.
