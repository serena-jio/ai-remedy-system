#!/bin/bash

# AI客服智能补救系统 - GitHub Pages 快速部署脚本

echo "🚀 开始部署到 GitHub Pages..."

# 1. 初始化 git（如果还没有）
if [ ! -d .git ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: 从转人工到智救成功 - AI客服智能补救系统"
fi

echo ""
echo "✅ 准备完成！"
echo ""
echo "📝 接下来请按以下步骤操作："
echo ""
echo "1️⃣  访问 https://github.com/new 创建新仓库"
echo "   - 仓库名称：ai-remedy-system"
echo "   - 设置为 Public（公开）"
echo "   - 不要勾选任何初始化选项"
echo ""
echo "2️⃣  创建后，复制仓库地址，然后运行："
echo "   git remote add origin https://github.com/你的用户名/ai-remedy-system.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3️⃣  在 GitHub 仓库页面："
echo "   - 点击 Settings（设置）"
echo "   - 左侧找到 Pages"
echo "   - Source 选择 'main' 分支"
echo "   - 点击 Save"
echo ""
echo "4️⃣  等待 2-3 分钟后，访问："
echo "   https://你的用户名.github.io/ai-remedy-system/"
echo ""
echo "🎉 完成！任何人都可以通过这个地址访问您的系统！"
