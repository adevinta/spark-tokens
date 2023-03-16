//
//  Badge.swift
//  SparkTokensDemo
//
//

import SwiftUI
import SparkTokens

struct Badge: View {
    
    enum BadgeType {
        case
        info,
        success,
        error,
        alert,
        none
        
        func getBackgroundColor() -> Color {
            switch self {
            case .info:
                return Color.brandInfo
            case .success:
                return Color.brandSuccess
            case .error:
                return Color.brandError
            case .alert:
                return Color.brandAlert
            case .none:
                return Color.brandNeutral
            }
        }
        
        func getForegroundColor() -> Color {
            switch self {
            case .info:
                return Color.brandOnInfo
            case .success:
                return Color.brandOnSuccess
            case .error:
                return Color.brandOnError
            case .alert:
                return Color.brandOnAlert
            case .none:
                return Color.brandOnNeutral
            }
        }
    }
    
    var text: String = ""
    var type: BadgeType = .none
    
    public var body: some View {
        HStack {
            Text(text).foregroundColor(type.getForegroundColor())
        }
        .padding(.vertical, Size.badgePaddingVertical)
        .padding(.horizontal, Size.badgePaddingHorizontal)
        .background(type.getBackgroundColor())
        .cornerRadius(Size.badgeBorderRadius)
    }
}

struct BadgesView: View {
    var body: some View {
        VStack(spacing: 10) {
            Badge(text: "default")
            Badge(text: "info", type: .info)
            Badge(text: "success", type: .success)
            Badge(text: "error", type: .error)
            Badge(text: "alert", type: .alert)
            
        }
        .navigationBarTitle("Badges")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.brandOnPrimary)
        .edgesIgnoringSafeArea(.all)
    }
}

struct Badge_Previews: PreviewProvider {
    static var previews: some View {
        BadgesView()
    }
}
