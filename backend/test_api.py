#!/usr/bin/env python3
"""
Quick test script for Kaizen AI API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_analyze():
    print("🧪 Testing /analyze endpoint...")
    response = requests.post(
        f"{BASE_URL}/analyze",
        json={"description": "Tokyo logistics company, 5 trucks, 2 warehouses, using Excel for routing, high fuel costs"}
    )

    if response.status_code == 200:
        data = response.json()
        print("✅ /analyze works!")
        print(f"   Found {len(data['problems'])} problems:")
        for i, problem in enumerate(data['problems'], 1):
            print(f"   {i}. {problem['title']} (${problem['cost_per_month']}/month)")
        return data
    else:
        print(f"❌ /analyze failed: {response.status_code}")
        print(response.text)
        return None


def test_generate_agents(analysis_data):
    print("\n🧪 Testing /generate-agents endpoint...")
    response = requests.post(
        f"{BASE_URL}/generate-agents",
        json=analysis_data
    )

    if response.status_code == 200:
        data = response.json()
        print("✅ /generate-agents works!")
        print(f"   Generated {len(data['agents'])} agents:")
        for i, agent in enumerate(data['agents'], 1):
            print(f"   {i}. {agent['name']}")
        return data
    else:
        print(f"❌ /generate-agents failed: {response.status_code}")
        print(response.text)
        return None


def test_simulate(analysis_data, agents_data):
    print("\n🧪 Testing /simulate endpoint...")
    response = requests.post(
        f"{BASE_URL}/simulate",
        json={
            "problems": analysis_data['problems'],
            "agents": agents_data['agents']
        }
    )

    if response.status_code == 200:
        data = response.json()
        print("✅ /simulate works!")
        print(f"   Total monthly savings: ${data['total_monthly_savings']}")
        print(f"   Metrics tracked: {len(data['metrics'])}")
        for metric in data['metrics']:
            print(f"   - {metric['metric_name']}: {metric['before']} → {metric['after']} ({metric['improvement_percent']}% improvement)")
        return data
    else:
        print(f"❌ /simulate failed: {response.status_code}")
        print(response.text)
        return None


if __name__ == "__main__":
    print("🚀 Kaizen AI API Test Suite\n")

    # Test flow
    analysis = test_analyze()

    if analysis:
        agents = test_generate_agents(analysis)

        if agents:
            simulation = test_simulate(analysis, agents)

            if simulation:
                print("\n✅ ALL TESTS PASSED! 🎉")
                print("\n📊 Full Pipeline Works:")
                print("   Company Description → Problems → Agents → Simulation")
            else:
                print("\n⚠️  Simulation test failed")
        else:
            print("\n⚠️  Agent generation test failed")
    else:
        print("\n⚠️  Analysis test failed")
