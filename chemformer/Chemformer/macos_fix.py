#!/usr/bin/env python3
"""
macOS兼容性修复
修复os.sched_getaffinity在macOS上不可用的问题
"""

import os
import multiprocessing


def apply_macos_compatibility_fix():
    """应用macOS兼容性修复"""
    if not hasattr(os, 'sched_getaffinity'):
        print("🔧 应用macOS兼容性修复...")
        
        def sched_getaffinity_fallback(pid):
            """macOS/Windows兼容的CPU亲和性获取函数"""
            cpu_count = os.cpu_count()
            return list(range(cpu_count))

        os.sched_getaffinity = sched_getaffinity_fallback
        print(f"✅ 已设置CPU核心数: {multiprocessing.cpu_count()}")
    else:
        print("✅ Linux环境，无需修复")


if __name__ == "__main__":
    apply_macos_compatibility_fix()

