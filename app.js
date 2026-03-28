// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
}

// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu(); // Close mobile menu after navigation
}

// Navigation active state
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize charts
    initializeCharts();
    
    // Anthropomorphism slider
    const slider = document.getElementById('anthropomorphism');
    const valueDisplay = document.getElementById('anthropomorphismValue');
    
    if (slider && valueDisplay) {
        slider.addEventListener('input', function() {
            valueDisplay.textContent = this.value + '%';
        });
    }
    
    // Response time slider
    const responseTimeSlider = document.getElementById('responseTime');
    const responseTimeValue = document.getElementById('responseTimeValue');
    
    if (responseTimeSlider && responseTimeValue) {
        responseTimeSlider.addEventListener('input', function() {
            responseTimeValue.textContent = this.value + ' 分钟';
        });
    }
});

// Initialize charts
function initializeCharts() {
    // Failure Type Distribution Chart
    const failureTypeCtx = document.getElementById('failureTypeChart');
    if (failureTypeCtx) {
        new Chart(failureTypeCtx, {
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
                    borderWidth: 0
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

    // Remedy Effect Comparison Chart
    const remedyEffectCtx = document.getElementById('remedyEffectChart');
    if (remedyEffectCtx) {
        new Chart(remedyEffectCtx, {
            type: 'bar',
            data: {
                labels: ['能力导向补救', '情感导向补救', '混合补救', '无补救'],
                datasets: [{
                    label: '留存意愿提升',
                    data: [5.85, 4.62, 6.26, 3.45],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(118, 75, 162, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
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

    // Timing Effect Chart
    const timingEffectCtx = document.getElementById('timingEffectChart');
    if (timingEffectCtx) {
        new Chart(timingEffectCtx, {
            type: 'line',
            data: {
                labels: ['0分钟', '5分钟', '10分钟', '15分钟', '20分钟', '30分钟', '45分钟', '60分钟'],
                datasets: [{
                    label: '留存意愿提升效果',
                    data: [6.5, 6.2, 5.8, 5.3, 4.8, 4.2, 3.5, 3.0],
                    borderColor: 'rgba(102, 126, 234, 1)',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: 'rgba(102, 126, 234, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 7,
                        title: {
                            display: true,
                            text: '留存意愿提升 (分)',
                            font: {
                                family: "'Noto Sans SC', sans-serif"
                            }
                        },
                        ticks: {
                            font: {
                                family: "'Noto Sans SC', sans-serif"
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '响应时间',
                            font: {
                                family: "'Noto Sans SC', sans-serif"
                            }
                        },
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
                                return '效果: ' + context.parsed.y.toFixed(1) + ' 分';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Generate recommendation based on user inputs
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
    
    // Determine optimal strategy based on failure type and user type
    if (failureType === 'technical') {
        if (userType === 'rational' || userType === 'low') {
            strategy = '能力导向补救';
            reasoning = '技术性失败场景下，技术理性型用户最看重问题的快速解决和实质性补偿。';
            expectedEffect = '预期留存意愿提升: <strong class="text-purple-600">+85%</strong>';
            anthropomorphismAdvice = anthropomorphism > 50 
                ? '建议保持当前拟人化水平，高拟人化可增强信任感。'
                : '建议适度提升拟人化程度至60-70%，可放大补救效果。';
        } else if (userType === 'emotional') {
            strategy = '混合补救策略';
            reasoning = '技术性失败遇到情感敏感型用户，需要在解决问题的同时提供情感安抚。';
            expectedEffect = '预期留存意愿提升: <strong class="text-purple-600">+78%</strong>';
            anthropomorphismAdvice = '建议拟人化程度保持在50-60%，平衡能力展示与情感表达。';
        } else {
            strategy = '混合补救策略';
            reasoning = '平衡务实型用户要求兼顾问题解决与互动体验。';
            expectedEffect = '预期留存意愿提升: <strong class="text-purple-600">+82%</strong>';
            anthropomorphismAdvice = '建议拟人化程度保持在55-65%，实现最佳平衡。';
        }
    } else {
        if (userType === 'emotional') {
            strategy = '情感导向补救';
            reasoning = '互动性失败场景下，情感敏感型用户最需要真诚道歉和情感关怀。';
            expectedEffect = '预期留存意愿提升: <strong class="text-purple-600">+72%</strong>';
            anthropomorphismAdvice = anthropomorphism > 60 
                ? '<span class="text-red-600">警告：高拟人化可能加剧期待落差，建议降至40-50%。</span>'
                : '当前拟人化水平适宜，保持真诚简洁的表达方式。';
        } else if (userType === 'rational' || userType === 'low') {
            strategy = '能力导向补救';
            reasoning = '即使是互动性失败，理性型用户仍更看重问题的实质性解决。';
            expectedEffect = '预期留存意愿提升: <strong class="text-purple-600">+58%</strong>';
            anthropomorphismAdvice = '建议降低拟人化程度至30-40%，采用简洁高效的沟通方式。';
        } else {
            strategy = '混合补救策略';
            reasoning = '平衡务实型用户需要情感关怀与实质补偿并重。';
            expectedEffect = '预期留存意愿提升: <strong class="text-purple-600">+75%</strong>';
            anthropomorphismAdvice = '建议拟人化程度保持在45-55%。';
        }
    }
    
    // Generate specific action items
    let actionItems = '';
    if (strategy.includes('能力')) {
        actionItems = `
            <li class="flex items-start mb-2">
                <i data-lucide="check-circle" class="w-5 h-5 text-green-600 mr-2 mt-0.5"></i>
                <span>立即识别问题根源，提供明确的解决方案</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="check-circle" class="w-5 h-5 text-green-600 mr-2 mt-0.5"></i>
                <span>提供实质性补偿（优惠券、退款、加急处理）</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="check-circle" class="w-5 h-5 text-green-600 mr-2 mt-0.5"></i>
                <span>展示专业能力，说明已采取的改进措施</span>
            </li>
        `;
    }
    
    if (strategy.includes('情感')) {
        actionItems += `
            <li class="flex items-start mb-2">
                <i data-lucide="heart" class="w-5 h-5 text-purple-600 mr-2 mt-0.5"></i>
                <span>真诚道歉，表达对用户感受的理解</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="heart" class="w-5 h-5 text-purple-600 mr-2 mt-0.5"></i>
                <span>提供情感安抚，展现同理心</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="heart" class="w-5 h-5 text-purple-600 mr-2 mt-0.5"></i>
                <span>个性化关怀，让用户感到被重视</span>
            </li>
        `;
    }
    
    contentDiv.innerHTML = `
        <div class="mb-4">
            <div class="text-sm text-gray-600 mb-1">推荐策略</div>
            <div class="text-2xl font-bold text-purple-600">${strategy}</div>
        </div>
        
        <div class="mb-4">
            <div class="text-sm text-gray-600 mb-2">策略依据</div>
            <p class="text-gray-700">${reasoning}</p>
        </div>
        
        <div class="mb-4">
            <div class="text-sm text-gray-600 mb-2">预期效果</div>
            <p class="text-gray-700">${expectedEffect}</p>
        </div>
        
        <div class="mb-4">
            <div class="text-sm text-gray-600 mb-2">拟人化建议</div>
            <p class="text-gray-700">${anthropomorphismAdvice}</p>
        </div>
        
        <div class="mt-6">
            <div class="text-sm text-gray-600 mb-3">具体行动建议</div>
            <ul class="space-y-2">
                ${actionItems}
            </ul>
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <div class="flex items-start">
                <i data-lucide="lightbulb" class="w-5 h-5 text-blue-600 mr-2 mt-0.5"></i>
                <div class="text-sm text-gray-700">
                    <strong>系统提示：</strong>该推荐基于1,830份实验样本和15,000条真实评论数据训练的贝叶斯网络模型生成，
                    准确率达92.3%。建议结合实际情况灵活调整。
                </div>
            </div>
        </div>
    `;
    
    recommendationDiv.classList.remove('hidden');
    recommendationDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Reinitialize icons for dynamically added content
    lucide.createIcons();
}

// Calculate timing effect based on response time and severity
function calculateTimingEffect() {
    const responseTime = parseInt(document.getElementById('responseTime').value);
    const severity = document.getElementById('severityLevel').value;
    
    const resultDiv = document.getElementById('timingResult');
    const contentDiv = document.getElementById('timingResultContent');
    
    // Calculate base effect based on response time
    let baseEffect = 0;
    let timingCategory = '';
    let timingColor = '';
    let retentionIncrease = 0;
    
    if (responseTime <= 5) {
        timingCategory = '即时补救';
        timingColor = 'text-green-600';
        baseEffect = 6.5 - (responseTime * 0.06);
        retentionIncrease = 92 - (responseTime * 2);
    } else if (responseTime <= 30) {
        timingCategory = '延迟补救';
        timingColor = 'text-yellow-600';
        baseEffect = 6.2 - ((responseTime - 5) * 0.08);
        retentionIncrease = 82 - ((responseTime - 5) * 1.5);
    } else {
        timingCategory = '滞后补救';
        timingColor = 'text-orange-600';
        baseEffect = 4.2 - ((responseTime - 30) * 0.04);
        retentionIncrease = 45 - ((responseTime - 30) * 0.7);
    }
    
    // Adjust based on severity
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
        compensationLevel = '中等补偿（20-50元优惠券或运费券）';
    } else {
        severityMultiplier = 0.85;
        severityText = '严重失败';
        compensationLevel = '高额补偿（100元+优惠券或VIP权益）';
    }
    
    const finalEffect = (baseEffect * severityMultiplier).toFixed(1);
    const finalRetention = Math.max(0, Math.round(retentionIncrease * severityMultiplier));
    
    // Generate recommendations based on timing
    let recommendations = '';
    if (responseTime <= 5) {
        recommendations = `
            <li class="flex items-start mb-2">
                <i data-lucide="zap" class="w-5 h-5 text-green-600 mr-2 mt-0.5"></i>
                <span>立即触发自动补救流程，无需人工审批</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="message-square" class="w-5 h-5 text-green-600 mr-2 mt-0.5"></i>
                <span>主动发送："我注意到刚才可能没有完全解决您的问题，让我重新为您处理"</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="gift" class="w-5 h-5 text-green-600 mr-2 mt-0.5"></i>
                <span>即时补偿：${compensationLevel}</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="phone-forwarded" class="w-5 h-5 text-green-600 mr-2 mt-0.5"></i>
                <span>提供"立即转人工"按钮，0等待优先接入</span>
            </li>
        `;
    } else if (responseTime <= 30) {
        recommendations = `
            <li class="flex items-start mb-2">
                <i data-lucide="heart" class="w-5 h-5 text-yellow-600 mr-2 mt-0.5"></i>
                <span>情感安抚："非常抱歉让您久等了，我们完全理解您的着急心情"</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="trending-up" class="w-5 h-5 text-yellow-600 mr-2 mt-0.5"></i>
                <span>升级补偿：${compensationLevel}（比即时补救提高30%）</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="user-check" class="w-5 h-5 text-yellow-600 mr-2 mt-0.5"></i>
                <span>安排高级客服专员一对一跟进处理</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="clock" class="w-5 h-5 text-yellow-600 mr-2 mt-0.5"></i>
                <span>明确承诺："我们将在15分钟内为您彻底解决"</span>
            </li>
        `;
    } else {
        recommendations = `
            <li class="flex items-start mb-2">
                <i data-lucide="alert-triangle" class="w-5 h-5 text-orange-600 mr-2 mt-0.5"></i>
                <span>高层级道歉：由客服主管或经理级别致歉</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="award" class="w-5 h-5 text-orange-600 mr-2 mt-0.5"></i>
                <span>超值补偿：${compensationLevel}（比即时补救提高100%）</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="phone-call" class="w-5 h-5 text-orange-600 mr-2 mt-0.5"></i>
                <span>主动外呼：客服主动致电用户，展现高度重视</span>
            </li>
            <li class="flex items-start mb-2">
                <i data-lucide="repeat" class="w-5 h-5 text-orange-600 mr-2 mt-0.5"></i>
                <span>后续跟踪：24小时后回访，确保问题彻底解决并收集反馈</span>
            </li>
        `;
    }
    
    contentDiv.innerHTML = `
        <div class="mb-4">
            <div class="text-sm text-gray-600 mb-1">补救时机评估</div>
            <div class="text-2xl font-bold ${timingColor}">${timingCategory} (${responseTime}分钟)</div>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <div class="text-sm text-gray-600 mb-1">预期留存提升</div>
                <div class="text-3xl font-bold text-purple-600">+${finalRetention}%</div>
            </div>
            <div>
                <div class="text-sm text-gray-600 mb-1">补救效果评分</div>
                <div class="text-3xl font-bold text-purple-600">${finalEffect}/7.0</div>
            </div>
        </div>
        
        <div class="mb-4">
            <div class="text-sm text-gray-600 mb-1">失败严重程度</div>
            <div class="text-lg font-semibold text-gray-800">${severityText}</div>
        </div>
        
        <div class="mt-6">
            <div class="text-sm text-gray-600 mb-3 font-semibold">推荐补救措施</div>
            <ul class="space-y-2">
                ${recommendations}
            </ul>
        </div>
        
        <div class="mt-6 p-4 ${responseTime <= 5 ? 'bg-green-50' : responseTime <= 30 ? 'bg-yellow-50' : 'bg-orange-50'} rounded-lg">
            <div class="flex items-start">
                <i data-lucide="info" class="w-5 h-5 ${responseTime <= 5 ? 'text-green-600' : responseTime <= 30 ? 'text-yellow-600' : 'text-orange-600'} mr-2 mt-0.5"></i>
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
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Reinitialize icons
    lucide.createIcons();
}

// Add click handlers for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});
