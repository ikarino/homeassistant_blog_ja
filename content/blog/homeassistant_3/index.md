---
title: Home Assistantを使えるようにするまで その4
date: "2020-10-17T03:00:00.00Z"
description: "Home Assistant 本体のインストール方法について"
categories: [Home Assistant]
comments: true
image:
  feature: https://images.unsplash.com/photo-1440635592348-167b1b30296f?crop=entropy&dpr=2&fit=crop&fm=jpg&h=475&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1250
  credit: thomas shellberg
  creditlink: https://unsplash.com/photos/Ki0dpxd3LGc
---

以下のステップで Home Assistant を使えるようにしていきます。

1. [必要なものと環境](/homeassistant_1)
2. [Raspberry Pi OS のセットアップ](/homeassistant_2)
3. **[Home Assistant のインストール(本記事)](/homeassistant_3)**
4. [Addon のインストール](/homeassistant_4)

# HomeAssistant のインストール

2020/10/17 現在、公式でサポートされている Home Assistant のインストール方法は 4 つあります。

[Installation Methods & Community Guides Wiki](https://www.home-assistant.io/blog/2020/05/26/installation-methods-and-community-guides-wiki/)

1. Home Assistant
2. Home Assistant Container
3. Home Assistant Supervised
4. Home Assistant Core

3.の方法で進めていきますが、これは Raspberry Pi OS を使いつつ、Home Assistant 全部入りをつかえるインストール方法です。

1.〜4.の違いの説明は少し込み入っています。  
読み飛ばしてしまって全く問題ありません。

| インストール方法             |        OS         | Supervisor, add-on |
| :--------------------------- | :---------------: | :----------------: |
| 1. Home Assistant            | Home Assistant OS |        有り        |
| 2. Home Assistant Container  |     指定なし      |        無し        |
| 3. Home Assistant Supervised |  指定なし(Linux)  |        有り        |
| 4. Home Assistant Core       |     指定なし      |        無し        |

## 必要なパッケージのインストール

```
sudo apt-get -y install network-manager apparmor apparmor-utils apparmor-profiles jq
```

## Docker のインストール

```
# sudo su
curl -sSL https://get.docker.com | sh
```

## 新しいユーザを docker グループに追加

```
usermod -aG docker testuser
```

##

```bash
mkdir config
sudo docker run -d --name="home-assistant" -v ./config:/config -v /etc/localtime:/etc/localtime:ro --net=host homeassistant/home-assistant:stable
```

##
