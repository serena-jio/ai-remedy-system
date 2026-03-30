// Initialize Lucide icons
lucide.createIcons();

// 当前页面
let currentPage = 'home';

// 页面切换函数
function switchPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新导航状态 - 底部导航
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageId) {
            item.classList.add('active');
        }
    });
    
    // 更新导航状态 - 桌面端导航
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });
    
    currentPage = pageId;
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 如果是研究发现页面，确保图表已初始化
    if (pageId === 'research') {
        setTimeout(() => {
            initializeCharts();
        }, 100);
    }
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 绑定底部导航点击事件
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.dataset.page;
            switchPage(pageId);
        });
    });
    
    // 绑定桌面端导航点击事件
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.dataset.page;
            switchPage(pageId);
        });
    });
    
    // 初始化图表
    initializeCharts();
    
    // 拟人化程度滑块
    const slider = document.getElementById('anthropomorphism');
    const valueDisplay = document.getElementById('anthropomorphismValue');
    
    if (slider && valueDisplay) {
        slider.addEventListener('input', function() {
            valueDisplay.textContent = this.value + '%';
        });
    }
    
    // 响应时间滑块
    const responseTimeSlider = document.getElementById('responseTime');
    const responseTimeValue = document.getElementById('responseTimeValue');
    
    if (responseTimeSlider && responseTimeValue) {
        responseTimeSlider.addEventListener('input', function() {
            responseTimeValue.textContent = this.value + ' 分钟';
        });
    }
});

// 图表实例
let failureTypeChart = null;
let remedyEffectChart = null;

// 初始化图表
function initializeCharts() {
    // 失败类型分布图
    const failureTypeCtx = document.getElementById('failureTypeChart');
    if (failureTypeCtx && !failureTypeChart) {
        failureTypeChart = new Chart(failureTypeCtx, {
            type: 'doughnut',
            data: {
                labels: ['技术性失败', '互动性失败', '其他'],
                datasets: [{
                    data: [63.6, 29.8, 6.6],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(118, 75, 162, 0.8)',
                        'rgba(156, 163, 175, 0.8)'
                    ],
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12,
                                family: "'Noto Sans SC', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // 补救效果对比图
    const remedyEffectCtx = document.getElementById('remedyEffectChart');
    if (remedyEffectCtx && !remedyEffectChart) {
        remedyEffectChart = new Chart(remedyEffectCtx, {
            type: 'bar',
            data: {
                labels: ['能力导向', '情感导向', '混合策略', '无补救'],
                datasets: [{
                    label: '留存意愿提升',
                    data: [5.85, 4.62, 6.26, 3.45],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(240, 147, 251, 0.8)',
                        'rgba(79, 172, 254, 0.8)',
                        'rgba(156, 163, 175, 0.8)'
                    ],
                    borderWidth: 0,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 7,
                        ticks: {
                            font: {
                                family: "'Noto Sans SC', sans-serif"
                            }
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: "'Noto Sans SC', sans-serif"
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '留存意愿: ' + context.parsed.y.toFixed(2) + ' 分';
                            }
                        }
                    }
                }
            }
        });
    }
}

// 生成推荐策略
function generateRecommendation() {
    const failureType = document.getElementById('failureType').value;
    const userType = document.getElementById('userType').value;
    const anthropomorphism = parseInt(document.getElementById('anthropomorphism').value);
    
    const recommendationDiv = document.getElementById('recommendation');
    const contentDiv = document.getElementById('recommendationContent');
    
    let strategy = '';
    let reasoning = '';
    let expectedEffect = '';
    let anthropomorphismAdvice = '';
    let effectPercent = 0;
    
    // 根据失败类型和用户类型确定最优策略
    if (failureType === 'technical') {
        if (userType === 'rational' || userType === 'low') {
            strategy = '能力导向补救';
            reasoning = '技术性失败场景下，理性型用户最看重问题的快速解决和实质性补偿。';
            effectPercent = 85;
            expectedEffect = '预期留存意愿提升: <strong style="color: #667eea;">+' + effectPercent + '%</strong>';
            anthropomorphismAdvice = anthropomorphism > 50 
                ? '<span style="color: #16a34a;"><i data-lucide="check" class="w-4 h-4 inline"></i> 建议保持当前拟人化水平，高拟人化可增强信任感。</span>'
                : '<span style="color: #d97706;"><i data-lucide="info" class="w-4 h-4 inline"></i> 建议适度提升拟人化程度至60-70%，可放大补救效果。</span>';
        } else if (userType === 'emotional') {
            strategy = '混合补救策略';
            reasoning = '技术性失败遇到感性型用户，需要在解决问题的同时提供情感安抚。';
            effectPercent = 78;
            expectedEffect = '预期留存意愿提升: <strong style="color: #667eea;">+' + effectPercent + '%</strong>';
            anthropomorphismAdvice = '建议拟人化程度保持在50-60%，平衡能力展示与情感表达。';
        } else {
            strategy = '混合补救策略';
            reasoning = '平衡型用户要求兼顾问题解决与互动体验。';
            effectPercent = 82;
            expectedEffect = '预期留存意愿提升: <strong style="color: #667eea;">+' + effectPercent + '%</strong>';
            anthropomorphismAdvice = '建议拟人化程度保持在55-65%，实现最佳平衡。';
        }
    } else {
        if (userType === 'emotional') {
            strategy = '情感导向补救';
            reasoning = '互动性失败场景下，感性型用户最需要真诚道歉和情感关怀。';
            effectPercent = 72;
            expectedEffect = '预期留存意愿提升: <strong style="color: #667eea;">+' + effectPercent + '%</strong>';
            anthropomorphismAdvice = anthropomorphism > 60 
                ? '<span style="color: #dc2626;"><i data-lucide="alert-triangle" class="w-4 h-4 inline"></i> 警告：高拟人化可能加剧期待落差，建议降至40-50%。</span>'
                : '<span style="color: #16a34a;"><i data-lucide="check" class="w-4 h-4 inline"></i> 当前拟人化水平适宜，保持真诚简洁的表达方式。</span>';
        } else if (userType === 'rational' || userType === 'low') {
            strategy = '能力导向补救';
            reasoning = '即使是互动性失败，理性型用户仍更看重问题的实质性解决。';
            effectPercent = 58;
            expectedEffect = '预期留存意愿提升: <strong style="color: #667eea;">+' + effectPercent + '%</strong>';
            anthropomorphismAdvice = '建议降低拟人化程度至30-40%，采用简洁高效的沟通方式。';
        } else {
            strategy = '混合补救策略';
            reasoning = '平衡型用户需要情感关怀与实质补偿并重。';
            effectPercent = 75;
            expectedEffect = '预期留存意愿提升: <strong style="color: #667eea;">+' + effectPercent + '%</strong>';
            anthropomorphismAdvice = '建议拟人化程度保持在45-55%。';
        }
    }
    
    // 生成行动建议
    let actionItems = '';
    if (strategy.includes('能力')) {
        actionItems = `
            <li class="flex items-start mb-3">
                <i data-lucide="check-circle-2" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #16a34a;"></i>
                <span>立即识别问题根源，提供明确的解决方案</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="gift" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #667eea;"></i>
                <span>提供实质性补偿（优惠券、退款、加急处理）</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="award" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #f59e0b;"></i>
                <span>展示专业能力，说明已采取的改进措施</span>
            </li>
        `;
    }
    
    if (strategy.includes('情感')) {
        actionItems += `
            <li class="flex items-start mb-3">
                <i data-lucide="heart" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #ec4899;"></i>
                <span>真诚道歉，表达对用户感受的理解</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="smile" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #f59e0b;"></i>
                <span>提供情感安抚，展现同理心</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="user-check" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #667eea;"></i>
                <span>个性化关怀，让用户感到被重视</span>
            </li>
        `;
    }
    
    if (strategy.includes('混合')) {
        actionItems = `
            <li class="flex items-start mb-3">
                <i data-lucide="message-circle" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #667eea;"></i>
                <span>首先真诚道歉，表达对用户感受的理解</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="wrench" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #16a34a;"></i>
                <span>快速定位问题，提供明确的解决方案</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="gift" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #ec4899;"></i>
                <span>提供补偿方案，包括优惠券或积分</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="phone" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #f59e0b;"></i>
                <span>后续跟进，确保问题彻底解决</span>
            </li>
        `;
    }
    
    contentDiv.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
            <div class="icon-box primary">
                <i data-lucide="lightbulb"></i>
            </div>
            <div>
                <div class="text-sm text-gray-500">推荐策略</div>
                <div class="text-2xl font-bold" style="color: #667eea;">${strategy}</div>
            </div>
        </div>
        
        <div class="mb-4 p-4 rounded-xl" style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);">
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">预期留存提升</span>
                <span class="text-3xl font-bold" style="color: #667eea;">+${effectPercent}%</span>
            </div>
        </div>
        
        <div class="mb-4">
            <div class="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <i data-lucide="info" class="w-4 h-4"></i>
                策略依据
            </div>
            <p class="text-gray-700">${reasoning}</p>
        </div>
        
        <div class="mb-4">
            <div class="text-sm text-gray-500 mb-2 flex items-center gap-2">
                <i data-lucide="sliders" class="w-4 h-4"></i>
                拟人化建议
            </div>
            <p class="text-gray-700">${anthropomorphismAdvice}</p>
        </div>
        
        <div class="mt-6">
            <div class="text-sm text-gray-500 mb-3 font-medium flex items-center gap-2">
                <i data-lucide="list-checks" class="w-4 h-4"></i>
                具体行动建议
            </div>
            <ul class="space-y-1">
                ${actionItems}
            </ul>
        </div>
        
        <div class="mt-6 p-4 rounded-xl" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);">
            <div class="flex items-start gap-3">
                <i data-lucide="info" class="w-5 h-5 flex-shrink-0" style="color: #16a34a;"></i>
                <div class="text-sm text-gray-700">
                    <strong>提示：</strong>该推荐基于1,830份实验样本和15,000条真实评论数据生成，建议结合实际情况灵活调整。
                </div>
            </div>
        </div>
    `;
    
    recommendationDiv.classList.remove('hidden');
    
    // 重新初始化图标
    lucide.createIcons();
}

// 计算时机效果
function calculateTimingEffect() {
    const responseTime = parseInt(document.getElementById('responseTime').value);
    const severity = document.getElementById('severityLevel').value;
    
    const resultDiv = document.getElementById('timingResult');
    const contentDiv = document.getElementById('timingResultContent');
    
    // 根据响应时间计算基础效果
    let baseEffect = 0;
    let timingCategory = '';
    let timingIcon = '';
    let timingColor = '';
    let retentionIncrease = 0;
    
    if (responseTime <= 5) {
        timingCategory = '即时补救';
        timingIcon = 'zap';
        timingColor = '#16a34a';
        baseEffect = 6.5 - (responseTime * 0.06);
        retentionIncrease = 92 - (responseTime * 2);
    } else if (responseTime <= 30) {
        timingCategory = '延迟补救';
        timingIcon = 'timer';
        timingColor = '#d97706';
        baseEffect = 6.2 - ((responseTime - 5) * 0.08);
        retentionIncrease = 82 - ((responseTime - 5) * 1.5);
    } else {
        timingCategory = '滞后补救';
        timingIcon = 'hourglass';
        timingColor = '#dc2626';
        baseEffect = 4.2 - ((responseTime - 30) * 0.04);
        retentionIncrease = 45 - ((responseTime - 30) * 0.7);
    }
    
    // 根据严重程度调整
    let severityMultiplier = 1.0;
    let severityText = '';
    let compensationLevel = '';
    
    if (severity === 'low') {
        severityMultiplier = 1.1;
        severityText = '轻微失败';
        compensationLevel = '小额优惠券（5-10元）';
    } else if (severity === 'medium') {
        severityMultiplier = 1.0;
        severityText = '中等失败';
        compensationLevel = '中等补偿（20-50元优惠券）';
    } else {
        severityMultiplier = 0.85;
        severityText = '严重失败';
        compensationLevel = '高额补偿（100元+优惠券或VIP权益）';
    }
    
    const finalEffect = (baseEffect * severityMultiplier).toFixed(1);
    const finalRetention = Math.max(0, Math.round(retentionIncrease * severityMultiplier));
    
    // 根据时机生成建议
    let recommendations = '';
    if (responseTime <= 5) {
        recommendations = `
            <li class="flex items-start mb-3">
                <i data-lucide="zap" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #16a34a;"></i>
                <span>立即触发自动补救流程，无需人工审批</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="message-square" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #667eea;"></i>
                <span>主动发送："我注意到刚才可能没有完全解决您的问题，让我重新为您处理"</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="gift" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #ec4899;"></i>
                <span>即时补偿：${compensationLevel}</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="phone-forwarded" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #f59e0b;"></i>
                <span>提供"立即转人工"按钮，0等待优先接入</span>
            </li>
        `;
    } else if (responseTime <= 30) {
        recommendations = `
            <li class="flex items-start mb-3">
                <i data-lucide="heart" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #ec4899;"></i>
                <span>情感安抚："非常抱歉让您久等了，我们完全理解您的着急心情"</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="trending-up" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #667eea;"></i>
                <span>升级补偿：${compensationLevel}（比即时补救提高30%）</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="user-check" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #16a34a;"></i>
                <span>安排高级客服专员一对一跟进处理</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="clock" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #f59e0b;"></i>
                <span>明确承诺："我们将在15分钟内为您彻底解决"</span>
            </li>
        `;
    } else {
        recommendations = `
            <li class="flex items-start mb-3">
                <i data-lucide="alert-triangle" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #dc2626;"></i>
                <span>高层级道歉：由客服主管或经理级别致歉</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="award" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #667eea;"></i>
                <span>超值补偿：${compensationLevel}（比即时补救提高100%）</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="phone-call" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #ec4899;"></i>
                <span>主动外呼：客服主动致电用户，展现高度重视</span>
            </li>
            <li class="flex items-start mb-3">
                <i data-lucide="repeat" class="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style="color: #16a34a;"></i>
                <span>后续跟踪：24小时后回访，确保问题彻底解决</span>
            </li>
        `;
    }
    
    contentDiv.innerHTML = `
        <div class="flex items-center gap-3 mb-4">
            <div class="icon-box" style="background: ${timingColor}; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <i data-lucide="${timingIcon}" style="color: white;"></i>
            </div>
            <div>
                <div class="text-sm text-gray-500">补救时机评估</div>
                <div class="text-2xl font-bold" style="color: ${timingColor};">${timingCategory}</div>
            </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);">
                <div class="text-sm text-gray-500 mb-1">预期留存提升</div>
                <div class="text-3xl font-bold" style="color: #667eea;">+${finalRetention}%</div>
            </div>
            <div class="p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #ecfeff 0%, #cffafe 100%);">
                <div class="text-sm text-gray-500 mb-1">补救效果评分</div>
                <div class="text-3xl font-bold" style="color: #0891b2;">${finalEffect}/7.0</div>
            </div>
        </div>
        
        <div class="mb-4 p-3 rounded-lg" style="background: #f1f5f9;">
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">失败严重程度</span>
                <span class="font-semibold text-gray-800">${severityText}</span>
            </div>
        </div>
        
        <div class="mt-6">
            <div class="text-sm text-gray-500 mb-3 font-medium flex items-center gap-2">
                <i data-lucide="list-checks" class="w-4 h-4"></i>
                推荐补救措施
            </div>
            <ul class="space-y-1">
                ${recommendations}
            </ul>
        </div>
        
        <div class="mt-6 p-4 rounded-xl" style="background: ${
            responseTime <= 5 ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : 
            responseTime <= 30 ? 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' : 
            'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)'
        };">
            <div class="flex items-start gap-3">
                <i data-lucide="info" class="w-5 h-5 flex-shrink-0" style="color: ${timingColor};"></i>
                <div class="text-sm text-gray-700">
                    <strong>时机建议：</strong>${
                        responseTime <= 5 
                            ? '您处于黄金补救窗口期！立即采取行动可获得最佳效果。' 
                            : responseTime <= 30 
                                ? '补救效果正在递减，建议尽快升级补救措施以挽回用户信任。'
                                : '补救时机已较晚，需要采取超常规措施并做好长期跟进准备。'
                    }
                </div>
            </div>
        </div>
    `;
    
    resultDiv.classList.remove('hidden');
    
    // 重新初始化图标
    lucide.createIcons();
}
